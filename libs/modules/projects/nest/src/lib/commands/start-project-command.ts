import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  StartProjectUseCaseInput,
  StartProjectUseCase,
  ProjectRepoTrait,
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
  constructor(@Inject('projectRepo') projectRepo: ProjectRepoTrait) {
    this.useCase = new StartProjectUseCase({ projectRepo });
  }

  async execute(command: StartProjectCommand) {
    const result = await this.useCase.execute(command.input);
    return result.toObject();
  }
}

export { StartProjectUseCaseInput };
