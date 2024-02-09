import { IResult, Fail, ID, UID, Combine } from 'rich-domain';
import { Project } from './project-root';
import { ProjectName } from './name';

export class ProjectBuilder {
  protected id: UID | undefined;
  protected createdAt: Date | undefined;
  protected updatedAt: Date | undefined;
  protected nameResult: IResult<ProjectName> = ProjectName.create({
    value: 'My New Project',
  });

  public withId(value: string): ProjectBuilder {
    this.id = ID.create(value);
    return this;
  }

  public withName(value: string): ProjectBuilder {
    this.nameResult = ProjectName.create({ value });
    return this;
  }

  withCreatedAt(date: Date): ProjectBuilder {
    this.createdAt = date;
    return this;
  }

  withUpdatedAt(date: Date): ProjectBuilder {
    this.updatedAt = date;
    return this;
  }

  public build(): IResult<Project> {
    const result = Combine([this.nameResult]);
    if (result.isFail()) return Fail(result.error());

    return Project.create({
      id: this.id ?? ID.create(),
      name: this.nameResult.value(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}
