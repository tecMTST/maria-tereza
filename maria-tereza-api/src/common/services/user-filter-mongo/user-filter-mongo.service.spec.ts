import { Test, TestingModule } from '@nestjs/testing';
import { UserFilterMongoService } from './user-filter-mongo.service';

describe('UserFilterMongoService', () => {
  let service: UserFilterMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFilterMongoService],
    }).compile();

    service = module.get<UserFilterMongoService>(UserFilterMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
