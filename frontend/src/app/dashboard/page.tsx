
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardApi, taskApi } from '@/lib/api';
import { DashboardStats, Team } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Users, 
  Folder, 
  CheckSquare, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { formatDate, getPriorityColor, getStatusColor } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [isReassigning, setIsReassigning] = useState(false);

  useEffect(() => {
    loadDashboardStats();
  }, [selectedTeam]);

  const loadDashboardStats = async () => {
    try {
      const response = await dashboardApi.getStats(selectedTeam || undefined);
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      toast.error('Failed to load dashboard stats');
    }
  };

  const handleReassignTasks = async () => {
    if (!selectedTeam) {
      toast.error('Please select a team first');
      return;
    }

    setIsReassigning(true);
    try {
      const response = await taskApi.reassign(selectedTeam);
      if (response.success) {
        toast.success(`Reassigned ${response.data.movedTasks.length} tasks`);
        loadDashboardStats();
      }
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setIsReassigning(false);
    }
  };

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <Button 
            onClick={handleReassignTasks}
            disabled={isReassigning}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isReassigning ? 'animate-spin' : ''}`} />
            {isReassigning ? 'Reassigning...' : 'Reassign Tasks'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTasks}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overloaded Members</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.teamSummary.filter(member => member.isOverloaded).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Team Summary</CardTitle>
              <CardDescription>Current workload distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.teamSummary.map((member) => (
                  <div key={member.memberId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{member.memberName}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${member.isOverloaded ? 'text-red-600' : 'text-green-600'}`}>
                        {member.currentTasks} / {member.capacity}
                      </p>
                      <p className="text-sm text-gray-600">
                        {member.isOverloaded ? 'Overloaded' : 'Within capacity'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest task reassignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {activity.details?.taskTitle && (
                          <>
                            Task <span className="font-medium">"{activity.details.taskTitle}"</span>{' '}
                            {activity.details.fromMember && activity.details.toMember && (
                              <>reassigned from {activity.details.fromMember} to {activity.details.toMember}</>
                            )}
                          </>
                        )}
                        {!activity.details.taskTitle && activity.action}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                {stats.recentActivities.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}