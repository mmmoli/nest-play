import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProjectsController } from './projects.controller';
import { InMemoryProjectRepo } from '@api/projects/core';
import { StartProjectCommand, StartProjectHandler } from './commands';

@Module({
  imports: [CqrsModule],
  controllers: [ProjectsController],
  providers: [
    {
      provide: 'projectRepo',
      useClass: InMemoryProjectRepo,
    },
    StartProjectCommand,
    StartProjectHandler,
  ],
  exports: [],
})
export class ProjectsModule {}
