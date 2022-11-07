export type TDeviceType = 'mobile' | 'desktop' | 'tablet';

export interface IDevice {
  type: TDeviceType;
  isMobile: boolean;
  isTablet: boolean;
}
