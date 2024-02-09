import { Fail, type IAdapter, type IResult, Ok } from 'rich-domain';
import { Project } from '../domain';

export type ProjectModel = Readonly<{
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export class ProjectToInfraAdapter implements IAdapter<Project, ProjectModel> {
  build(input: Project): IResult<ProjectModel> {
    const createdAt = input.get('createdAt');
    const updatedAt = input.get('updatedAt');
    if (!createdAt || !updatedAt) {
      return Fail('Missing createdAt or updatedAt');
    }

    const model: ProjectModel = {
      id: input.id.value(),
      name: input.get('name').get('value'),
      createdAt,
      updatedAt,
    };

    return Ok(Object.freeze(model));
  }
}
