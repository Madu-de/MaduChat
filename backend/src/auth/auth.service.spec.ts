import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { WebsocketService } from '../websocket/websocket.service';
import { HttpException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByUsernameWithPassword: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: WebsocketService,
          useValue: {
            socket: {
              in: jest.fn(() => {
                return {
                  emit: jest.fn(),
                };
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('unauthorized', () => {
    it('should throw an error', () => {
      try {
        service.unauthorized(0);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('notAllowed', () => {
    it('should throw an error', () => {
      try {
        service.notAllowed(0);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });
  });
});
