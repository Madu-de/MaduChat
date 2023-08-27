import { Chat } from './../chat/chat';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user';

describe('UserService', () => {
  let service: UserService;

  const repoMock = {
    findeOne: jest.fn(),
    find: jest.fn(),
  };

  const exampleUser = {
    id: 'testid',
    name: 'testname',
    email: 'test@email',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(() => {
              return new Promise<User>(resolve => {
                resolve(<User>exampleUser);
              });
            }),
          },
        },
        {
          provide: getRepositoryToken(Chat),
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GetUser', () => {
    it('should return a user', async () => {
      expect(await service.getUser(exampleUser.id)).toBe(exampleUser);
    });
  });
});
