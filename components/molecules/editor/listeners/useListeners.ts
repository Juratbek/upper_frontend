import { usePasteListener } from './paste/usePasteListener';
import { useSelectionListener } from './selection/useSelectionListener';
import { useShortcutsListener } from './shortcuts/useShortcutsListener';

export const useListeners = () => {
  useSelectionListener();
  usePasteListener();
  useShortcutsListener();
};
