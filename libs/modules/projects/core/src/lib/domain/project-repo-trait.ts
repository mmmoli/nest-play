import { IResult } from 'rich-domain';
import { Project } from './project-root';

export interface ProjectRepoTrait {
  fetchById(id: string): Promise<IResult<Project>>;
  save(project: Project): Promise<IResult<void>>;
}
