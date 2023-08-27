import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user';

describe('AuthController', () => {
  let controller: AuthController;

  const token = 'testtoken';
  const user = <User>{
    name: 'testuser',
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'testpassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(() => {
              return new Promise(resolve => {
                resolve(token);
              });
            }),
          },
        },
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should log in', async () => {
    expect(await controller.signIn({})).toBe(token);
  });

  it('should register', async () => {
    expect(await controller.register(user)).toBe(token);
  });
});
