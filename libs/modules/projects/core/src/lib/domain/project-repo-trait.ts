import { IResult } from 'rich-domain';
import { Project } from './project-root';

export interface ProjectRepoTrait {
  fetchForUserId(userId: string): Promise<IResult<Project[]>>;
  fetchById(id: string): Promise<IResult<Project>>;
  save(project: Project): Promise<IResult<void>>;
}
