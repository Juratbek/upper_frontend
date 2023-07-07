import { formatToKMB, convertToCardNumbers } from '../../utils/number';

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

describe('convertToCardNumbers', () => {
  it('returns empty string if card number is falsy', () => {
    expect(convertToCardNumbers('')).toEqual('');
    expect(convertToCardNumbers(undefined)).toEqual('');
  });
  it('adds space between digits', () => {
    expect(convertToCardNumbers('8600060412324325')).toEqual('8600 0604 1232 4325');
  });
});
