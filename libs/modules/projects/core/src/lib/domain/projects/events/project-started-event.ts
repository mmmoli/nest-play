import type {
  IDomainEvent,
  IHandle as DomainEvent,
  EventHandler,
} from 'rich-domain';
import type { Project } from '../aggregate';
import {
  type EventBusTrait,
  ProjectStartedEvent as GlobalProjectStartedEvent,
} from '@api/projects/shared';

export interface ProjectStartedEventDeps {
  eventBus: EventBusTrait;
}

export class ProjectStartedEvent implements DomainEvent<Project> {
  public readonly eventName = 'ProjectStartedEvent';

  constructor(protected readonly deps: ProjectStartedEventDeps) {}

  async dispatch(
    event: IDomainEvent<Project>,
    handler: EventHandler<Project, void>
  ): Promise<void> {
    const { aggregate } = event;

    this.deps.eventBus.publish(
      new GlobalProjectStartedEvent({
        name: aggregate.name,
        projectId: aggregate.id.value(),
      })
    );

    const eventName = this.eventName;
    await handler.execute({ aggregate, eventName });
  }
}
