import { DEVICE_SIZES, DEVICE_TYPES } from './device.constants';
import { IDevice, TDeviceType } from './device.types';

export const getDevice = (): IDevice => {
  let screenWith = 0;
  let type: TDeviceType = DEVICE_TYPES.desktop;

  try {
    screenWith = screen.width;
  } catch (e) {
    return {
      type,
      isMobile: type === 'mobile',
      isTablet: type === 'tablet',
      isDesktop: type === 'desktop',
    };
  }

  if (screenWith < DEVICE_SIZES.mobile) {
    type = DEVICE_TYPES.mobile;
  }

  if (DEVICE_SIZES.mobile <= screenWith && screenWith < DEVICE_SIZES.tablet) {
    type = DEVICE_TYPES.tablet;
  }

  if (screenWith >= DEVICE_SIZES.tablet) {
    type = DEVICE_TYPES.desktop;
  }

  return {
    type,
    isMobile: type === 'mobile',
    isTablet: type === 'tablet',
    isDesktop: type === 'desktop',
  };
};

export function detectPlatform() {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('windows')) {
    return 'Windows';
  } else if (userAgent.includes('macintosh') || userAgent.includes('mac os')) {
    return 'MacOS';
  } else if (userAgent.includes('linux')) {
    return 'Linux';
  } else if (userAgent.includes('android')) {
    return 'Android';
  } else if (
    userAgent.includes('iphone') ||
    userAgent.includes('ipad') ||
    userAgent.includes('ipod')
  ) {
    return 'iOS';
  } else {
    return 'Unknown';
  }
}
