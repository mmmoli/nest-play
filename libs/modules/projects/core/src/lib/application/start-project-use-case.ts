import {
  Ok,
  Fail,
  type IUseCase,
  type IResult,
  EventHandler,
} from 'rich-domain';
import { type ProjectRepoTrait, Project, ProjectStartedEvent } from '../domain';
import { EventBusTrait } from '@api/projects/shared';

export interface StartProjectUseCaseDeps {
  projectRepo: ProjectRepoTrait;
  afterProjectStartedPolicy: EventHandler<Project, void>;
  eventBus: EventBusTrait;
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
    const project = projectResult.value();

    project.addEvent(new ProjectStartedEvent({ eventBus: this.deps.eventBus }));

    const saveResult = await this.deps.projectRepo.save(project);
    if (saveResult.isFail()) return Fail(saveResult.error());

    project.dispatchEvent(
      'ProjectStartedEvent',
      this.deps.afterProjectStartedPolicy
    );

    return Ok();
  }
}
