import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketService } from './websocket.service';
import { MessageService } from '../message/message.service';

describe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebsocketService,
        {
          provide: MessageService,
          useValue: {
            createMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WebsocketService>(WebsocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
