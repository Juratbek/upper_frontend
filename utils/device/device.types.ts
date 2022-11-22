export type TDeviceType = 'mobile' | 'desktop' | 'tablet' | 'unknown';

export interface IDevice {
  type: TDeviceType;
  isMobile: boolean;
  isTablet: boolean;
}
