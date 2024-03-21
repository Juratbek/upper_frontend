import { vi } from 'vitest';

import { getDevice } from './device';
import { DEVICE_SIZES } from './device.constants';

describe('utils/device', () => {
  it('getDevice default state', () => {
    const res = getDevice();
    expect(res).toEqual({ type: 'mobile', isMobile: true, isTablet: false, isDesktop: false });
  });

  it(`returns mobile when screen is narrower than ${DEVICE_SIZES.mobile}`, () => {
    vi.spyOn(screen, 'width', 'get').mockReturnValue(DEVICE_SIZES.mobile - 1);
    const res = getDevice();
    expect(res).toEqual({ type: 'mobile', isMobile: true, isTablet: false, isDesktop: false });
  });

  it(`returns tablet when screen is wider than ${DEVICE_SIZES.mobile}`, () => {
    vi.spyOn(screen, 'width', 'get').mockReturnValue(DEVICE_SIZES.mobile + 1);
    const res = getDevice();
    expect(res).toEqual({ type: 'tablet', isMobile: false, isTablet: true, isDesktop: false });
  });

  it(`returns desktop when screen is wider than ${DEVICE_SIZES.tablet}`, () => {
    vi.spyOn(screen, 'width', 'get').mockReturnValue(DEVICE_SIZES.tablet + 1);
    const res = getDevice();
    expect(res).toEqual({ type: 'desktop', isMobile: false, isTablet: false, isDesktop: true });
  });
});
