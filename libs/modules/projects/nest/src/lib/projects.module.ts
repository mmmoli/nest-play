import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProjectsController } from './projects.controller';
import { InMemoryProjectRepo, ProjectToInfraAdapter } from '@api/projects/core';
import { StartProjectCommand, StartProjectHandler } from './commands';
import {
  FetchProjectsForUserQuery,
  FetchProjectsForUserHandler,
  FetchProjectForIdQuery,
  FetchProjectForIdHandler,
} from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [ProjectsController],
  providers: [
    {
      provide: 'projectRepo',
      useClass: InMemoryProjectRepo,
    },
    {
      provide: 'projectAdapter',
      useValue: new ProjectToInfraAdapter(),
    },
    StartProjectCommand,
    StartProjectHandler,
    FetchProjectsForUserQuery,
    FetchProjectsForUserHandler,
    FetchProjectForIdQuery,
    FetchProjectForIdHandler,
  ],
  exports: [],
})
export class ProjectsModule { }
