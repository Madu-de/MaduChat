import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { JwtService } from '@nestjs/jwt';
import { MessageService } from './message.service';

describe('MessageController', () => {
  let controller: MessageController;

  const mockMessageService = {};
  const mockJwtService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [MessageService, JwtService],
    })
      .overrideProvider(MessageService)
      .useValue(mockMessageService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
