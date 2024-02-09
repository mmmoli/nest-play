import {
  Ok,
  Fail,
  type IUseCase,
  type IResult,
  IAdapter,
  Combine,
} from 'rich-domain';
import { type ProjectRepoTrait, type Project } from '../domain';

export interface FetchProjectsForUserUseCaseDeps<
  T extends Record<string, unknown>
> {
  projectRepo: ProjectRepoTrait;
  presenter: IAdapter<Project, T>;
}

export interface FetchProjectsForUserUseCaseInput {
  userId: string;
}

export class FetchProjectsForUserUseCase<T extends Record<string, unknown> = {}>
  implements IUseCase<FetchProjectsForUserUseCaseInput, IResult<T[]>>
{
  constructor(protected readonly deps: FetchProjectsForUserUseCaseDeps<T>) { }

  async execute(data: FetchProjectsForUserUseCaseInput): Promise<IResult<T[]>> {
    const queryResult = await this.deps.projectRepo.fetchForUserId(data.userId);
    if (queryResult.isFail()) return Fail(queryResult.error());
    const projects = queryResult.value();

    if (projects.length === 0) return Ok([]);
    const presenterResults = projects.map(this.deps.presenter.build);

    const combinedResult = Combine(presenterResults)
    if (combinedResult.isFail())
      return Fail(`Failed to fetch projects for user id: ${combinedResult.error()}`);
    const projectsPresent = presenterResults.map((result) => result.value());
    return Ok(projectsPresent);
  }
}
