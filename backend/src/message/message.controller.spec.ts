import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { AuthGuard } from '../auth/auth.guard';
import { GuardMock } from '../../test/guardMock';

describe('MessageController', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: {
            getMessage: jest.fn(),
            createMessage: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(GuardMock)
      .compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
