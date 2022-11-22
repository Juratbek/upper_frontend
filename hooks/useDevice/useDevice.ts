import { useEffect, useState } from 'react';
import { getDevice, IDevice } from 'utils';

export const useDevice = (defaultDevice?: Partial<IDevice>): IDevice => {
  const [device, setDevice] = useState<IDevice>({
    isMobile: false,
    isTablet: false,
    type: 'unknown',
    ...defaultDevice,
  });

  useEffect(() => {
    const device = getDevice();
    setDevice(device);
  }, []);

  return device;
};
