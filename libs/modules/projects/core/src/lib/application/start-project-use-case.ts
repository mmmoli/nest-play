import { Ok, Fail, type IUseCase, type IResult } from 'rich-domain';
import { type ProjectRepoTrait, Project } from '../domain';

export interface StartProjectUseCaseDeps {
  projectRepo: ProjectRepoTrait;
}

export interface StartProjectUseCaseInput {
  name?: string;
  userId: string;
}

export class StartProjectUseCase
  implements IUseCase<StartProjectUseCaseInput, IResult<void>>
{
  constructor(protected readonly deps: StartProjectUseCaseDeps) {}

  async execute(data: StartProjectUseCaseInput): Promise<IResult<void>> {
    const builder = Project.builder();
    if (data.name) builder.withName(data.name);
    const projectResult = builder.build();
    if (projectResult.isFail()) return Fail(projectResult.error());
    return Ok();
  }
}
