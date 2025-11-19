
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  createdAt: string;
  members: TeamMember[];
  projects: Project[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  capacity: number;
  userId?: string;
  teamId: string;
  createdAt: string;
  currentTasks?: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  teamId: string;
  userId: string;
  createdAt: string;
  tasks?: Task[];
  team?: Team;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'InProgress' | 'Done';
  projectId: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  member?: TeamMember;
  project?: Project;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: any;
  userId: string;
  taskId?: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
  task?: Task;
}

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  teamSummary: TeamMemberSummary[];
  recentActivities: ActivityLog[];
}

export interface TeamMemberSummary {
  memberId: string;
  memberName: string;
  role: string;
  currentTasks: number;
  capacity: number;
  isOverloaded: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}