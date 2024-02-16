import { ProjectBuilder } from './project-builder';

describe('ProjectBuilder', () => {
  let builder: ProjectBuilder;
  beforeEach(() => {
    builder = new ProjectBuilder();
  });

  it('should be defined', () => {
    expect(builder).toBeDefined();
  });

  it('has a build method', () => {
    const result = builder.build();
    expect(result.isOk()).toBeTruthy();
  });

  it('can set an id', () => {
    const id = 'fake-id';
    const project = builder.withId(id).build().value();
    expect(project.id.value()).toBe(id);
  });

  it('can set a name', () => {
    const name = 'fake-name';
    const project = builder.withName(name).build().value();
    expect(project.get('name').get('value')).toBe(name);
  });
});
