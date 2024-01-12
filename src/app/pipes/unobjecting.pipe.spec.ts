import { UnobjectingPipe } from './unobjecting.pipe';

describe('UnobjectingPipe', () => {
  it('create an instance', () => {
    const pipe = new UnobjectingPipe();
    expect(pipe).toBeTruthy();
  });
});
