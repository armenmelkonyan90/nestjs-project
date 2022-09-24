import { Test, TestingModule } from '@nestjs/testing';
import { UserProfessionController } from './user-profession.controller';
import { UserProfessionService } from './user-profession.service';

describe('UserProfessionController', () => {
  let controller: UserProfessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfessionController],
      providers: [UserProfessionService],
    }).compile();

    controller = module.get<UserProfessionController>(UserProfessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
