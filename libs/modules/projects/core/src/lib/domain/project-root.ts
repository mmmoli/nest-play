import { ProjectName } from './name';
import { ProjectBuilder } from './project-builder';
import { UID, Aggregate, IResult, Ok } from 'rich-domain';
import { ProjectStartedEvent } from './project-started-event';

export interface ProjectProps {
  id?: UID;
  name: ProjectName;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Project extends Aggregate<ProjectProps> {
  private constructor(props: ProjectProps) {
    super(props);
    if (props.id?.isNew()) {
      this.addEvent(new ProjectStartedEvent());
    }
  }

  public static override create(props: ProjectProps): IResult<Project> {
    return Ok(new Project(props));
  }

  public static builder(): ProjectBuilder {
    return new ProjectBuilder();
  }

  get name(): Readonly<string> {
    return this.props.name.get('value');
  }
}
