import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Project } from './models/project.model';
import { ProjectsService } from './projects.service';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectEntity } from './entities/project.entity';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => [Project], { name: 'projects' })
  findAll(): Promise<ProjectEntity[]> {
    return this.projectsService.findAllProjects();
  }

  @Query(() => Project, { name: 'project', nullable: true })
  findOne(
    @Args('uuid', { type: () => ID }) uuid: string,
  ): Promise<ProjectEntity> {
    return this.projectsService.findOneProject(uuid);
  }

  @Mutation(() => Project)
  createProject(
    @Args('input') input: CreateProjectInput,
  ): Promise<ProjectEntity> {
    return this.projectsService.createProject(input);
  }

  @Mutation(() => Project)
  updateProject(
    @Args('uuid', { type: () => ID }) uuid: string,
    @Args('input') input: UpdateProjectInput,
  ): Promise<ProjectEntity> {
    return this.projectsService.updateProject(uuid, input);
  }

  @Mutation(() => Boolean)
  deleteProject(
    @Args('uuid', { type: () => ID }) uuid: string,
  ): Promise<boolean> {
    return this.projectsService.deleteProject(uuid);
  }
}
