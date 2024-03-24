import { uuid } from './uuid';

describe('uuid', () => {
  it('returns unique UUID with 8 length', () => {
    const uuids = Array(1000)
      .fill('')
      .map(() => uuid(8));

    const set = new Set(uuids);
    expect(set.size).toEqual(uuids.length);
    expect(uuids[0].length).toEqual(8);
  });

  it('returns UUID with length of 36 by default', () => {
    const res = uuid();
    expect(res.length).toEqual(36);
  });
});
