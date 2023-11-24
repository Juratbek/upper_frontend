import { DEVICE_TYPES } from './device.constants';
import { IDevice, TDeviceType } from './device.types';

export const getDevice = (): IDevice => {
  let screenWith = 0;
  let type: TDeviceType = DEVICE_TYPES.desktop;
  let isMobile = false;
  let isTablet = false;
  try {
    screenWith = screen.width;
  } catch (e) {
    return {
      type,
      isMobile,
      isTablet,
    };
  }

  if (screenWith < 576) {
    isMobile = true;
    isTablet = false;
    type = DEVICE_TYPES.mobile;
  }
  if (576 <= screenWith && screenWith < 1025) {
    isMobile = false;
    isTablet = true;
    type = DEVICE_TYPES.tablet;
  }

  return {
    type,
    isMobile,
    isTablet,
  };
};
