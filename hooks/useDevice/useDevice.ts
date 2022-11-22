import { useEffect, useState } from 'react';
import { getDevice, IDevice } from 'utils';

export const useDevice = (): IDevice => {
  const [device, setDevice] = useState<IDevice>({
    isMobile: false,
    isTablet: false,
    type: 'unknown',
  });

  useEffect(() => {
    const device = getDevice();
    setDevice(device);
  }, []);

  return device;
};
