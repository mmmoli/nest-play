import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import {
  FetchProjectsForUserUseCaseInput,
  FetchProjectsForUserUseCase,
  ProjectRepoTrait,
  ProjectToInfraAdapter,
} from '@api/projects/core';
import { Inject } from '@nestjs/common';

export class FetchProjectsForUserQuery {
  constructor(public readonly input: FetchProjectsForUserUseCaseInput) {}
}

@QueryHandler(FetchProjectsForUserQuery)
export class FetchProjectsForUserHandler
  implements IQueryHandler<FetchProjectsForUserQuery>
{
  private useCase: FetchProjectsForUserUseCase;
  constructor(
    @Inject('projectRepo') protected projectRepo: ProjectRepoTrait,
    @Inject('projectAdapter') protected presenter: ProjectToInfraAdapter
  ) {
    this.useCase = new FetchProjectsForUserUseCase({
      projectRepo,
      presenter,
    });
  }

  async execute(query: FetchProjectsForUserQuery) {
    const result = await this.useCase.execute(query.input);
    return result.toObject();
  }
}

export { FetchProjectsForUserUseCaseInput };
