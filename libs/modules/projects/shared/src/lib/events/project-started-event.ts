export interface ProjectStartedEventProps {
  projectId: string;
  name: string;
}

export class ProjectStartedEvent {
  constructor(public readonly payload: ProjectStartedEventProps) {}
}
