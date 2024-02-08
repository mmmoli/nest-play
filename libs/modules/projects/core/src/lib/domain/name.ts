import { ValueObject, IResult, Ok } from 'rich-domain';

export interface NameProps {
  value: string;
}

export class ProjectName extends ValueObject<NameProps> {
  private constructor(props: NameProps) {
    super(props);
  }

  public static override create(props: NameProps): IResult<ProjectName> {
    return Ok(new ProjectName(props));
  }
}
