import { computeStyles } from './style';

describe('computeStyles', () => {
  it('computes style objects', () => {
    const first = { backgroundColor: 'red' };
    const second = { marginBottom: 12 };
    const third = { padding: 24 };
    const res = computeStyles(first, second, third);
    expect(res).toEqual({ ...first, ...second, ...third });
  });

  it('returns empty object by default', () => {
    const res = computeStyles();
    expect(res).toEqual({});
  });
});
