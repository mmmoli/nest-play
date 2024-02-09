import type {
  IDomainEvent,
  IHandle as DomainEvent,
  EventHandler,
} from 'rich-domain';
import type { Project } from './project-root';

export class ProjectStartedEvent implements DomainEvent<Project> {
  public readonly eventName = 'ProjectStartedEvent';

  async dispatch(
    event: IDomainEvent<Project>,
    handler: EventHandler<Project, void>
  ): Promise<void> {
    const { aggregate } = event;
    console.log(
      `EVENT DISPATCH: ProjectStartedEvent. ${aggregate.hashCode().value()}`
    );
    const eventName = this.eventName;
    await handler.execute({ aggregate, eventName });
  }
}
