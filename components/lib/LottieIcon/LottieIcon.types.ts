export interface ILottieIconProps {
  isDark: boolean;
  width?: number;
  height?: number;
  eventListeners?: [
    {
      eventName: string;
      callback: () => any;
    },
  ];
}
