import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { AuthGuard } from '../auth/auth.guard';
import { GuardMock } from '../../test/guardMock';
import { ChatGuard } from './chat/chat.guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user';
import { AuthService } from '../auth/auth.service';

describe('WebsocketGateway', () => {
  let gateway: WebsocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebsocketGateway,
        {
          provide: WebsocketService,
          useValue: {
            joinChat: jest.fn(),
            sendMessage: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useClass(GuardMock)
      .overrideGuard(ChatGuard)
      .useClass(GuardMock)
      .compile();

    gateway = module.get<WebsocketGateway>(WebsocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
