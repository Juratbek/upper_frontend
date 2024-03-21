import { TDeviceType } from './device.types';

export const DEVICE_TYPES: Record<TDeviceType, TDeviceType> = {
  mobile: 'mobile',
  desktop: 'desktop',
  tablet: 'tablet',
};

export const DEVICE_SIZES: Record<TDeviceType, number> = {
  mobile: 576,
  tablet: 1050,
  desktop: Infinity,
};
