import type { IDashboardStats } from '../interfaces';
export declare class DashboardService {
    private projectRepository;
    private taskRepository;
    private teamRepository;
    private activityRepository;
    private taskService;
    getDashboardStats(userId: string, teamId?: string): Promise<IDashboardStats>;
}
//# sourceMappingURL=dashboard.services.d.ts.map