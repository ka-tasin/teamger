export interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string; 
}

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

// Team Interfaces
export interface ITeam {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTeam {
  name: string;
  userId: string;
}

export interface ITeamMember {
  id: string;
  name: string;
  role: string;
  capacity: number;
  userId?: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTeamMember {
  name: string;
  role: string;
  capacity: number;
  teamId: string;
  userId?: string;
}

// Project Interfaces
export interface IProject {
  id: string;
  name: string;
  description?: string;
  teamId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProject {
  name: string;
  description?: string;
  teamId: string;
  userId: string;
}

// Task Interfaces
export interface ITask {
  id: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'InProgress' | 'Done';
  projectId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTask {
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  projectId: string;
  assignedTo?: string;
}

export interface IUpdateTask {
  title?: string;
  description?: string;
  priority?: 'Low' | 'Medium' | 'High';
  status?: 'Pending' | 'InProgress' | 'Done';
  assignedTo?: string;
}

export interface ITaskWithDetails extends ITask {
  project: IProject;
  member?: ITeamMember;
}

// Activity Log Interfaces
export interface IActivityLog {
  id: string;
  action: string;
  details: any;
  userId: string;
  taskId?: string;
  createdAt: Date;
}

// Dashboard Interfaces
export interface IDashboardStats {
  totalProjects: number;
  totalTasks: number;
  teamSummary: ITeamMemberSummary[];
  recentActivities: IActivityLog[];
}

export interface ITeamMemberSummary {
  memberId: string;
  memberName: string;
  role: string;
  currentTasks: number;
  capacity: number;
  isOverloaded: boolean;
}

// Reassignment Interfaces
export interface IReassignmentResult {
  movedTasks: Array<{
    taskId: string;
    taskTitle: string;
    fromMember: string;
    toMember: string;
  }>;
}