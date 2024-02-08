import { Test } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ProjectsController],
    }).compile();

    controller = module.get(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
