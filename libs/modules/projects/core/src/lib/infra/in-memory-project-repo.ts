import { IResult, Ok, Fail } from 'rich-domain';
import { Project, ProjectRepoTrait } from '../domain';

export class InMemoryProjectRepo implements ProjectRepoTrait {
  private projects: Map<string, Project> = new Map();

  async fetchForUserId(): Promise<IResult<Project[]>> {
    const projectBuilder = Project.builder();
    const projects: Project[] = [];
    const count = 5;
    const now = new Date()
    for (let i = 0; i < count; i++) {
      projects.push(
        projectBuilder.withName(`My Project #${i + 1}`).withCreatedAt(now).withUpdatedAt(now)
          .build().value()
      );
    }

    this.projects = new Map(projects.map(project => [project.id.value(), project]))
    return Ok(projects);
  }

  async fetchById(id: string): Promise<IResult<Project>> {
    const project = this.projects.get(id);
    if (!project) return Fail(`Hmm, couldn't find that Project.`);
    return Ok(project);
  }

  async save(project: Project): Promise<IResult<void>> {
    const id = project.id.value();
    this.projects.set(id, project);
    return Ok();
  }
}

export { ProjectRepoTrait };
