
import { TaskRepository } from '../repositories/task.repository';
import { TeamMemberRepository } from '../repositories/teamMember.repository';
import { ActivityRepository } from '../repositories/activity.repository';
import { ProjectRepository } from '../repositories/project.repository';
import type { 
  ICreateTask, 
  ITask, 
  IUpdateTask, 
  IReassignmentResult,
  ITeamMemberSummary 
} from '../interfaces/index';

export class TaskService {
  private taskRepository = new TaskRepository();
  private teamMemberRepository = new TeamMemberRepository();
  private activityRepository = new ActivityRepository();
  private projectRepository = new ProjectRepository();

  async createTask(taskData: ICreateTask, userId: string): Promise<ITask> {
    // Validate project exists
    const project = await this.projectRepository.findById(taskData.projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // If assigned to a member, validate they belong to the project's team
    if (taskData.assignedTo) {
      const member = await this.teamMemberRepository.findById(taskData.assignedTo);
      if (!member || member.teamId !== project.teamId) {
        throw new Error('Team member not found in project team');
      }
    }

    const task = await this.taskRepository.create(taskData);
    
    // Log activity
    await this.activityRepository.create({
      action: 'TASK_CREATED',
      details: { 
        taskId: task.id, 
        title: task.title,
        projectId: task.projectId 
      },
      userId
    });

    return task;
  }

  async updateTask(id: string, taskData: IUpdateTask, userId: string): Promise<ITask> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    const task = await this.taskRepository.update(id, taskData);

    // Log activity if assignment changed
    if (taskData.assignedTo && taskData.assignedTo !== existingTask.assignedTo) {
      await this.activityRepository.create({
        action: 'TASK_ASSIGNMENT_CHANGED',
        details: { 
          taskId: task.id, 
          title: task.title,
          previousAssignee: existingTask.assignedTo,
          newAssignee: taskData.assignedTo
        },
        userId,
        taskId: task.id
      });
    }

    return task;
  }

  async reassignTasks(teamId: string, userId: string): Promise<IReassignmentResult> {
    const teamMembers = await this.teamMemberRepository.findByTeamId(teamId);
    const tasks = await this.taskRepository.findByTeamId(teamId);
    
    const movedTasks = [];
    const memberWorkload = new Map<string, number>();

    // Calculate current workload
    teamMembers.forEach(member => {
      const memberTasks = tasks.filter(task => task.assignedTo === member.id);
      memberWorkload.set(member.id, memberTasks.length);
    });

    // Reassign overloaded tasks
    for (const member of teamMembers) {
      const currentLoad = memberWorkload.get(member.id) || 0;
      
      if (currentLoad > member.capacity) {
        const overload = currentLoad - member.capacity;
        const memberTasks = tasks
          .filter(task => task.assignedTo === member.id && task.status !== 'Done')
          .sort((a, b) => {
            // Sort by priority (Low first, then Medium)
            const priorityOrder = { Low: 0, Medium: 1, High: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          });

        let reassignedCount = 0;
        
        for (const task of memberTasks) {
          if (reassignedCount >= overload) break;
          if (task.priority === 'High') continue; 

          // Find member with lowest workload and capacity
          const availableMember = teamMembers
            .filter(m => m.id !== member.id)
            .sort((a, b) => {
              const aLoad = memberWorkload.get(a.id) || 0;
              const bLoad = memberWorkload.get(b.id) || 0;
              return (aLoad / a.capacity) - (bLoad / b.capacity);
            })
            .find(m => (memberWorkload.get(m.id) || 0) < m.capacity);

          if (availableMember) {
            // Reassign task
            await this.taskRepository.update(task.id, { 
              assignedTo: availableMember.id 
            });

            // Update workload tracking
            memberWorkload.set(member.id, (memberWorkload.get(member.id) || 0) - 1);
            memberWorkload.set(availableMember.id, (memberWorkload.get(availableMember.id) || 0) + 1);

            // Log activity
            await this.activityRepository.create({
              action: 'TASK_REASSIGNED',
              details: {
                taskId: task.id,
                taskTitle: task.title,
                fromMember: member.name,
                toMember: availableMember.name
              },
              userId,
              taskId: task.id
            });

            movedTasks.push({
              taskId: task.id,
              taskTitle: task.title,
              fromMember: member.name,
              toMember: availableMember.name
            });

            reassignedCount++;
          }
        }
      }
    }

    return { movedTasks };
  }

  async getTeamMemberSummary(teamId: string): Promise<ITeamMemberSummary[]> {
    const teamMembers = await this.teamMemberRepository.findByTeamId(teamId);
    const tasks = await this.taskRepository.findByTeamId(teamId);

    return teamMembers.map(member => {
      const currentTasks = tasks.filter(
        task => task.assignedTo === member.id && task.status !== 'Done'
      ).length;
      
      return {
        memberId: member.id,
        memberName: member.name,
        role: member.role,
        currentTasks,
        capacity: member.capacity,
        isOverloaded: currentTasks > member.capacity
      };
    });
  }

  async getTasks(filters: {
    projectId?: string;
    assignedTo?: string;
    status?: string;
    priority?: string;
  }): Promise<ITask[]> {
    return this.taskRepository.getTasksWithFilters(filters);
  }

  async deleteTask(id: string, userId: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    await this.taskRepository.delete(id);

    // Log activity
    await this.activityRepository.create({
      action: 'TASK_DELETED',
      details: { 
        taskId: id, 
        title: task.title 
      },
      userId
    });
  }
}