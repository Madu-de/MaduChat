import { CanActivate } from '@nestjs/common';

export class GuardMock implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}
