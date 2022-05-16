import { Test, TestingModule } from '@nestjs/testing';
import { RefreshJwtStrategyService } from './refresh-jwt-strategy.service';

describe('RefreshJwtStrategyService', () => {
  let service: RefreshJwtStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshJwtStrategyService],
    }).compile();

    service = module.get<RefreshJwtStrategyService>(RefreshJwtStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
