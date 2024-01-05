import { Test, TestingModule } from '@nestjs/testing';
import { ChatGuard } from './chat.guard';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { ChatService } from '../../chat/chat.service';

describe('ChatGuard', () => {
  let guard: ChatGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGuard,
        {
          provide: AuthService,
          useValue: {
            notAllowed: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUser: jest.fn(),
          },
        },
        {
          provide: ChatService,
          useValue: {
            getChat: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<ChatGuard>(ChatGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
