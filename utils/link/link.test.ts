import { isRemoteUrl } from '.';

describe('isRemoteUrl', () => {
  it('checks if a link is internal', () => {
    const isRemote = isRemoteUrl('http://localhost:3000');
    expect(isRemote).toEqual(true);

    expect(isRemoteUrl('https://upper.uz')).toEqual(true);
    expect(isRemoteUrl('//upper.uz')).toEqual(false);
    expect(isRemoteUrl('/profile')).toEqual(false);
  });
});
