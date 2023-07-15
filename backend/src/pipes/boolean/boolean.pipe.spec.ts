import { BooleanPipe } from './boolean.pipe';

describe('BooleanPipe', () => {
  let pipe: BooleanPipe;

  it('should be defined', () => {
    pipe = new BooleanPipe();
    expect(pipe).toBeDefined();
  });

  it('should return true', () => {
    expect(pipe.transform('true')).toBeTruthy();
  });

  it('should return false', () => {
    expect(pipe.transform('false')).toBeFalsy();
  });
});
