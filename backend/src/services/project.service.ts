import { ProjectRepository } from '../repositories/project.repository';
import { ICreateProjectDTO, IUpdateProjectDTO } from '../interfaces/project.interface';

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async createProject(data: ICreateProjectDTO, ownerId: string) {
    return await this.projectRepository.create({
      ...data,
      ownerId,
    });
  }

  async getProjectsByOwner(ownerId: string) {
    return await this.projectRepository.findByOwnerId(ownerId);
  }

  async getProjectById(projectId: string) {
    return await this.projectRepository.findById(projectId);
  }

  async updateProject(projectId: string, data: IUpdateProjectDTO) {
    return await this.projectRepository.update(projectId, data);
  }

  async deleteProject(projectId: string) {
    return await this.projectRepository.delete(projectId);
  }
}