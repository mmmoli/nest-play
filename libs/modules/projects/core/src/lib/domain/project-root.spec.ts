import { ProjectName } from './name';
import { Project } from './project-root';

describe('Project Aggregate Root', () => {
  let project: Project;
  beforeEach(() => {
    project = Project.create({
      name: ProjectName.create({ value: 'fake-name' }).value(),
    }).value();
  });

  it('should be defined', () => {
    expect(project).toBeDefined();
  });

  it('has a builder', () => {
    const builder = Project.builder();
    expect(builder).toBeDefined();
  });
});
