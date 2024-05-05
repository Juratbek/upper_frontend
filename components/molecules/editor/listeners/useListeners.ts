import { usePasteListener } from './paste/usePasteListener';
import { useSelectionListener } from './selection/useSelectionListener';

export const useListeners = () => {
  useSelectionListener();
  usePasteListener();
};
