import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user';

describe('UserService', () => {
  let service: UserService;

  const mockUsersRepository = {
    findeOne: jest.fn().mockResolvedValue({
      id: 'test',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return something', () => {
    expect(service.getUser('test', true, true, true)).toBeDefined();
  });
});
