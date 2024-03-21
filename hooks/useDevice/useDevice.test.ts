import { renderHook } from '@testing-library/react';
import { DEVICE_SIZES } from 'utils/device/device.constants';
import { vi } from 'vitest';

import { useDevice } from './useDevice';

describe('hooks/useDevice', () => {
  it('returns default value', () => {
    const { result } = renderHook(useDevice);
    expect(result.current).toEqual({
      type: 'mobile',
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
  });

  it(`returns mobile when screen is narrower than ${DEVICE_SIZES.mobile}`, () => {
    vi.spyOn(screen, 'width', 'get').mockReturnValue(DEVICE_SIZES.mobile - 1);
    const { result } = renderHook(useDevice);
    expect(result.current).toEqual({
      type: 'mobile',
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
  });

  it(`returns tablet when screen is wider than ${DEVICE_SIZES.mobile}`, () => {
    vi.spyOn(screen, 'width', 'get').mockReturnValue(DEVICE_SIZES.mobile + 1);
    const { result } = renderHook(useDevice);
    expect(result.current).toEqual({
      type: 'tablet',
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });
  });

  it(`returns desktop when screen is wider than ${DEVICE_SIZES.tablet}`, () => {
    vi.spyOn(screen, 'width', 'get').mockReturnValue(DEVICE_SIZES.tablet + 1);
    const { result } = renderHook(useDevice);
    expect(result.current).toEqual({
      type: 'desktop',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });
});
