import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface IClientOnlyPortalProps {
  selector: string;
  children: ReactNode;
}

export const ClientOnlyPortal: FC<IClientOnlyPortalProps> = ({ children, selector }) => {
  const ref = useRef<HTMLElement>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector) as HTMLElement;
    setIsMounted(true);
  }, [selector]);

  return isMounted && ref.current ? createPortal(children, ref.current) : null;
};
