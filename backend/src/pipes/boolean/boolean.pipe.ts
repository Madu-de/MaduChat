import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class BooleanPipe implements PipeTransform {
  transform(value: any) {
    value === 'true' ? (value = true) : (value = false);
    return value;
  }
}
