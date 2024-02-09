import { ProjectStartedEvent } from '@api/projects/shared';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ProjectStartedEvent)
export class RandomHandler implements IEventHandler<ProjectStartedEvent> {
  constructor() {}
  handle(event: ProjectStartedEvent) {
    console.log('RANDOM EVENT DISPATCH: ProjectStartedEvent.');
  }
}
