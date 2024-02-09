import * as events from '../events';

type Event = events.ProjectStartedEvent;

export interface EventBusTrait {
  publish(event: Event): unknown;
}
