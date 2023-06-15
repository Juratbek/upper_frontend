import { formatToKMB } from '../../utils/number';

describe('formatToKMB', () => {
  it('should add suffix for less than 1000', () => {
    const text = formatToKMB(999);
    expect(text).toEqual('999');
  });
  it('should add suffix for 1000', () => {
    const text = formatToKMB(1000);
    expect(text).toEqual('1 Ming');
  });
  it('should add suffix for 1000000', () => {
    const text = formatToKMB(1000000);
    expect(text).toEqual('1 Million');
  });
});
