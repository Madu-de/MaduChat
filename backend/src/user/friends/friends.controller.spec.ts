import { Test, TestingModule } from '@nestjs/testing';
import { FriendsController } from './friends.controller';
import { UserService } from '../user.service';
import { AuthGuard } from '../../auth/auth.guard';
import { GuardMock } from '../../../test/guardMock';

describe('FriendsController', () => {
  let controller: FriendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendsController],
      providers: [
        {
          provide: UserService,
          useValue: {
            addFriendRequest: jest.fn(),
            removeFriend: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useClass(GuardMock)
      .compile();

    controller = module.get<FriendsController>(FriendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
