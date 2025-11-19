import { create } from 'zustand';
import { User, Team, Project, Task } from '@/types';

interface AppState {
  user: User | null;
  teams: Team[];
  projects: Project[];
  tasks: Task[];
  setUser: (user: User | null) => void;
  setTeams: (teams: Team[]) => void;
  setProjects: (projects: Project[]) => void;
  setTasks: (tasks: Task[]) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  teams: [],
  projects: [],
  tasks: [],
  setUser: (user) => set({ user }),
  setTeams: (teams) => set({ teams }),
  setProjects: (projects) => set({ projects }),
  setTasks: (tasks) => set({ tasks }),
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, teams: [], projects: [], tasks: [] });
  },
}));