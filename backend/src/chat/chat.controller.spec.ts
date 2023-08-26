import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AuthGuard } from '../auth/auth.guard';
import { ChatGuard } from '../websocket/chat/chat.guard';
import { GuardMock } from '../../test/guardMock';

describe('ChatController', () => {
  let controller: ChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: {
            getChat: jest.fn(),
            getChatMessage: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(GuardMock)
      .overrideGuard(ChatGuard)
      .useValue(GuardMock)
      .compile();

    controller = module.get<ChatController>(ChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
