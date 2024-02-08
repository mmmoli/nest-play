import { IResult, Ok, Fail } from 'rich-domain';
import { Project, ProjectRepoTrait } from '../domain';

export class InMemoryProjectRepo implements ProjectRepoTrait {
  private projects: Map<string, Project> = new Map();

  async fetchById(id: string): Promise<IResult<Project>> {
    const project = this.projects.get(id);
    if (!project) return Fail('No Project found');
    return Ok(project);
  }

  async save(project: Project): Promise<IResult<void>> {
    const id = project.id.value();
    this.projects.set(id, project);
    return Ok();
  }
}

export { ProjectRepoTrait };
