import {
  Fail,
  type IUseCase,
  type IResult,
  IAdapter,
} from 'rich-domain';
import { type ProjectRepoTrait, type Project } from '../domain';

export interface FetchProjectForIdrUseCaseDeps<
  T extends Record<string, unknown>
> {
  projectRepo: ProjectRepoTrait;
  presenter: IAdapter<Project, T>;
}

export interface FetchProjectForIdUseCaseInput {
  projectId: string;
}

export class FetchProjectForIdUseCase<T extends Record<string, unknown> = {}>
  implements IUseCase<FetchProjectForIdUseCaseInput, IResult<T>>
{
  constructor(protected readonly deps: FetchProjectForIdrUseCaseDeps<T>) { }

  async execute(data: FetchProjectForIdUseCaseInput): Promise<IResult<T>> {
    const queryResult = await this.deps.projectRepo.fetchById(data.projectId);
    if (queryResult.isFail()) return Fail(queryResult.error());
    const project = queryResult.value();
    return this.deps.presenter.build(project)
  }
}
