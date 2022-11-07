import { DEVICE_TYPES } from './device.constants';
import { IDevice, TDeviceType } from './device.types';

export const getDevice = (): IDevice => {
  let screenWith = 0;
  try {
    screenWith = screen.width;
  } catch (e) {}
  let type: TDeviceType = DEVICE_TYPES.desktop;
  let isMobile = false;
  let isTablet = false;

  if (screenWith < 576) {
    isMobile = true;
    isTablet = false;
    type = DEVICE_TYPES.mobile;
  }
  if (576 <= screenWith && screenWith < 768) {
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
