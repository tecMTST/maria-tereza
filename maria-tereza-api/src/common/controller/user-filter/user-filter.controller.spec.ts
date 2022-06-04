import { Test, TestingModule } from '@nestjs/testing';
import { UserFilterController } from './user-filter.controller';

describe('UserFilterController', () => {
  let controller: UserFilterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFilterController],
    }).compile();

    controller = module.get<UserFilterController>(UserFilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
