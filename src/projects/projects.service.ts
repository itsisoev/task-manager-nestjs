import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
  ) {}

  async findAllProjects(): Promise<ProjectEntity[]> {
    return this.projectsRepository.find({
      relations: ['owner'],
    });
  }

  async findOneProject(uuid: string): Promise<ProjectEntity> {
    const project = await this.projectsRepository.findOne({
      where: { uuid },
      relations: ['owner'],
    });
    if (!project) {
      throw new NotFoundException(`Проект с ID ${uuid} не найден`);
    }
    return project;
  }

  async findByOwner(ownerId: string): Promise<ProjectEntity[]> {
    return this.projectsRepository.find({
      where: { owner: { uuid: ownerId } },
      relations: ['owner'],
    });
  }

  async createProject(input: CreateProjectInput): Promise<ProjectEntity> {
    const project = this.projectsRepository.create({
      name: input.name,
      description: input.description,
      owner: { uuid: input.ownerId },
    });
    const saved = await this.projectsRepository.save(project);

    return this.findOneProject(saved.uuid);
  }

  async updateProject(
    uuid: string,
    input: UpdateProjectInput,
  ): Promise<ProjectEntity> {
    const project = await this.findOneProject(uuid);

    if (input.ownerId) {
      project.owner = { uuid: input.ownerId } as unknown as UserEntity;
    }
    Object.assign(project, {
      name: input.name ?? project.name,
      description: input.description ?? project.description,
    });

    return this.projectsRepository.save(project);
  }

  async deleteProject(uuid: string): Promise<boolean> {
    const project = await this.findOneProject(uuid);
    await this.projectsRepository.remove(project);
    return true;
  }
}
