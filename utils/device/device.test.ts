import { getDevice } from './device';

describe('utils/device', () => {
  it('getDevice default state', () => {
    const res = getDevice();
    expect(res).toEqual({ type: 'mobile', isMobile: true, isTablet: false, isDesktop: false });
  });
});
