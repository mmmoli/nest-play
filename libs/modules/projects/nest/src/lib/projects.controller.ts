import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { StartProjectCommand } from './commands';
import { StartProjectUseCaseInput } from '@api/projects/core';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('start')
  async startProject(@Body() data: StartProjectUseCaseInput) {
    return this.commandBus.execute(new StartProjectCommand(data));
  }
}
