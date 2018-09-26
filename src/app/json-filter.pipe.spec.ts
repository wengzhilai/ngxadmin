import { JsonFilterPipe } from './pipe/json-filter.pipe';

describe('JsonFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new JsonFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
