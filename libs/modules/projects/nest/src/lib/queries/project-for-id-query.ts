import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import {
  FetchProjectForIdUseCase,
  FetchProjectForIdUseCaseInput,
  ProjectRepoTrait,
  ProjectToInfraAdapter,
} from '@api/projects/core';
import { Inject } from '@nestjs/common';

export class FetchProjectForIdQuery {
  constructor(public readonly input: FetchProjectForIdUseCaseInput) { }
}

@QueryHandler(FetchProjectForIdQuery)
export class FetchProjectForIdHandler
  implements IQueryHandler<FetchProjectForIdQuery>
{
  private useCase: FetchProjectForIdUseCase;
  constructor(
    @Inject('projectRepo') protected projectRepo: ProjectRepoTrait,
    @Inject('projectAdapter') protected presenter: ProjectToInfraAdapter
  ) {
    this.useCase = new FetchProjectForIdUseCase({
      projectRepo,
      presenter,
    });
  }

  async execute(query: FetchProjectForIdQuery) {
    const result = await this.useCase.execute(query.input);
    return result.toObject();
  }
}

export { FetchProjectForIdUseCaseInput };
