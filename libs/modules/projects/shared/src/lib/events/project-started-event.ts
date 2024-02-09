export class ProjectStartedEvent {
  constructor(
    public readonly projectId: string,
    public readonly name: string
  ) {}
}
