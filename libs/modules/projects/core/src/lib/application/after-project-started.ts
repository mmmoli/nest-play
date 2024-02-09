import type { EventHandler, HandlerPayload } from 'rich-domain';
import { Project } from '../domain';

export class AfterProjectStartedPolicy implements EventHandler<Project, void> {
  async execute(data: HandlerPayload<Project>): Promise<void> {
    console.log('AFTER PROJECT STARTED POLICY…');
    console.log('Send some notifications…');
  }
}
