import { Test, TestingModule } from '@nestjs/testing';
import { UserProfessionService } from './user-profession.service';

describe('UserProfessionService', () => {
  let service: UserProfessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProfessionService],
    }).compile();

    service = module.get<UserProfessionService>(UserProfessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
