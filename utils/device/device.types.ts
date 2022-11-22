export type TDeviceType = 'mobile' | 'desktop' | 'tablet';

export interface IDevice {
  type: TDeviceType | undefined;
  isMobile: boolean;
  isTablet: boolean;
}
