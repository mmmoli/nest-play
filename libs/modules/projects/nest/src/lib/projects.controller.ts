import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { StartProjectCommand, StartProjectUseCaseInput } from './commands';
import {
  FetchProjectForIdQuery,
  FetchProjectsForUserQuery,
  FetchProjectsForUserUseCaseInput,
} from './queries';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBusy: QueryBus
  ) { }

  @Post('start')
  async startProject(@Body() data: StartProjectUseCaseInput) {
    return this.commandBus.execute(new StartProjectCommand(data));
  }

  @Get('for-user/:userId')
  async listForUser(@Param('userId') userId: string) {
    return this.queryBusy.execute(new FetchProjectsForUserQuery({
      userId
    }));
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    return this.queryBusy.execute(new FetchProjectForIdQuery({
      projectId: id
    }));
  }
}
