import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import {
  StartProjectUseCaseInput,
  StartProjectUseCase,
  ProjectRepoTrait,
  AfterProjectStartedPolicy,
} from '@api/projects/core';
import { Inject } from '@nestjs/common';

export class StartProjectCommand {
  constructor(public readonly input: StartProjectUseCaseInput) {}
}

@CommandHandler(StartProjectCommand)
export class StartProjectHandler
  implements ICommandHandler<StartProjectCommand>
{
  private useCase: StartProjectUseCase;
  constructor(
    @Inject('projectRepo') protected projectRepo: ProjectRepoTrait,
    protected eventBus: EventBus
  ) {
    const afterProjectStartedPolicy = new AfterProjectStartedPolicy();
    this.useCase = new StartProjectUseCase({
      projectRepo,
      afterProjectStartedPolicy,
      eventBus: this.eventBus,
    });
  }

  async execute(command: StartProjectCommand) {
    const result = await this.useCase.execute(command.input);
    return result.toObject();
  }
}

export { StartProjectUseCaseInput };
