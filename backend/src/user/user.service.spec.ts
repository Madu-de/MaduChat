import { Chat } from './../chat/chat';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user';

describe('UserService', () => {
  let service: UserService;

  const exampleUser = <User>{
    id: 'testid',
    name: 'testname',
    username: 'testname',
    email: 'test@email',
    password: 'testpassword',
  };

  const globalChat = <Chat>{
    id: 'global',
    name: 'Global',
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
                resolve(exampleUser);
              });
            }),
            save: jest.fn((user: User) => user),
          },
        },
        {
          provide: getRepositoryToken(Chat),
          useValue: {
            findOne: jest.fn(() => {
              return new Promise<Chat>(resolve => {
                resolve(globalChat);
              });
            }),
            save: jest.fn(),
          },
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

  describe('CreateUser', () => {
    it('should return the user', async () => {
      service.isDataAlreadyUsed = jest.fn(
        () => new Promise(resolve => resolve([false, ''])),
      );
      expect(await service.createUser(exampleUser)).toBe(exampleUser);
    });
  });
});
