'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { taskAPI, projectAPI, teamMemberAPI } from '@/lib/api';
import { Project, TeamMember, Priority, TaskStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  projectId?: string;
}

export function TaskDialog({ open, onClose, onSuccess, projectId }: TaskDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: projectId || '',
    assignedMemberId: '',
    priority: 'MEDIUM' as Priority,
    status: 'PENDING' as TaskStatus,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [overCapacityWarning, setOverCapacityWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchProjects();
    }
  }, [open]);

  useEffect(() => {
    if (formData.projectId) {
      fetchMembers(formData.projectId);
    }
  }, [formData.projectId]);

  useEffect(() => {
    if (formData.assignedMemberId) {
      checkMemberCapacity(formData.assignedMemberId);
    }
  }, [formData.assignedMemberId]);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load projects',
        variant: 'destructive',
      });
    }
  };

  const fetchMembers = async (projectId: string) => {
    try {
      const project = await projectAPI.getById(projectId);
      if (project.data.team) {
        const response = await teamMemberAPI.getByTeam(project.data.team.id);
        setMembers(response.data);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load team members',
        variant: 'destructive',
      });
    }
  };

  const checkMemberCapacity = async (memberId: string) => {
    try {
      const response = await teamMemberAPI.getWorkload(memberId);
      const member = members.find((m) => m.id === memberId);
      setSelectedMember(member || null);
      setOverCapacityWarning(response.data.currentTasks >= response.data.capacity);
    } catch (error) {
      console.error('Failed to check capacity');
    }
  };

  const handleAutoAssign = async () => {
    if (!formData.projectId) return;
    
    try {
      const response = await taskAPI.autoAssign(formData.projectId);
      setFormData({ ...formData, assignedMemberId: response.data.id });
      toast({
        title: 'Auto-assigned',
        description: `Task assigned to ${response.data.name}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Auto-assignment failed',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await taskAPI.create(formData);
      toast({ title: 'Success', description: 'Task created successfully!' });
      setFormData({
        title: '',
        description: '',
        projectId: projectId || '',
        assignedMemberId: '',
        priority: 'MEDIUM',
        status: 'PENDING',
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to create task',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Implement login feature"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of the task"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectId">Project</Label>
                <Select
                  value={formData.projectId}
                  onValueChange={(value) => setFormData({ ...formData, projectId: value, assignedMemberId: '' })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as Priority })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="assignedMemberId">Assign To</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAutoAssign}
                  disabled={!formData.projectId}
                >
                  Auto-assign
                </Button>
              </div>
              <Select
                value={formData.assignedMemberId}
                onValueChange={(value) => setFormData({ ...formData, assignedMemberId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => {
                    const activeTasks = member.tasks?.filter(t => t.status !== 'DONE').length || 0;
                    return (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} ({activeTasks}/{member.capacity})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {overCapacityWarning && selectedMember && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {selectedMember.name} is already at or over capacity. Assign anyway?
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.projectId}>
              {loading ? 'Creating...' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}