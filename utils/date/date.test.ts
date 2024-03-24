import { dateInterval, toDateString } from './date';

describe('utils/toDateString', () => {
  it('returns formatted date', () => {
    const now = new Date();
    const date = toDateString(now);
    expect(date).toEqual(now.toLocaleDateString('ru'));
  });

  it('returns formatted date from string date', () => {
    const formattedDate = toDateString('2024-01-14T04:55:49.658Z', { month: 'long' });
    expect(formattedDate).toEqual('14-yanvar 2024');

    const formattedDateShort = toDateString('2024-01-14T04:55:49.658Z', { month: 'short' });
    expect(formattedDateShort).toEqual('14-yan. 2024');
  });

  it('returns empty string if date is not present', () => {
    const date = toDateString('');
    expect(date).toEqual('');
  });
});

describe('utils/dateInterval', () => {
  it("returns 'Hozirgina' if date differance is less than 60 seconds", () => {
    const formattedDate = dateInterval(new Date());
    expect(formattedDate).toEqual('Hozirgina');
  });

  it('returns empty string if date is not present', () => {
    const date = dateInterval('');
    expect(date).toEqual('');
  });
});
