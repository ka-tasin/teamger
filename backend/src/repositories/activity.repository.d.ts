import { BaseRepository } from './BaseRepository';
import type { IActivityLog } from '../interfaces';
export declare class ActivityRepository extends BaseRepository<IActivityLog> {
    create(activityData: Omit<IActivityLog, 'id' | 'createdAt'>): Promise<IActivityLog>;
    findByUserId(userId: string, limit?: number): Promise<IActivityLog[]>;
    findByTeamId(teamId: string, limit?: number): Promise<IActivityLog[]>;
}
//# sourceMappingURL=activity.repository.d.ts.map