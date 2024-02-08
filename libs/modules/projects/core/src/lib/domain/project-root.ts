import { ProjectName } from './name';
import { ProjectBuilder } from './project-builder';
import { UID, Aggregate, IResult, Ok } from 'rich-domain';

export interface ProjectProps {
  id?: UID;
  name: ProjectName;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Project extends Aggregate<ProjectProps> {
  private constructor(props: ProjectProps) {
    super(props);
  }

  public static override create(props: ProjectProps): IResult<Project> {
    return Ok(new Project(props));
  }

  public static builder(): ProjectBuilder {
    return new ProjectBuilder();
  }
}
