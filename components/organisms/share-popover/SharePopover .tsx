import { Clickable } from 'components/lib';
import Link from 'next/link';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeSharePopover } from 'store/states/sharePopover';
import { ICONS } from 'variables';

import { MEDIA_ICONS } from './SharePopover.constants';
import classes from './SharePopover.module.scss';

export const SharePopover = forwardRef<HTMLDivElement, { isOpen: boolean }>(function Component(
  { isOpen },
  ref,
) {
  const [contentUrl, setContentUrl] = useState('');
  const dispatch = useDispatch();

  const CopyIcon = ICONS.copy;

  const closePopover = useCallback(() => dispatch(closeSharePopover()), []);
  const copyUrlHandler = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(contentUrl);
    } finally {
      setTimeout(() => {}, 1000);
    }
  };

  useEffect(() => {
    setContentUrl(window.location.href);
  }, []);

  return (
    <div className={classes.popover} style={{ display: isOpen ? 'block' : 'none' }} ref={ref}>
      <div className={classes['popover-header']}>
        <p className={classes.headline}>Ulashish</p>
        <Clickable className={classes['close-icon']} onClick={closePopover}>
          &#x2715;
        </Clickable>
      </div>
      <div className={classes['popover-body']}>
        <ul className={classes['media-icons']}>
          {MEDIA_ICONS.map(({ icon: Icon, url, name }) => (
            <li key={Icon.toString()} className={classes['media-icon']}>
              <Link className={classes['media-icon-btn']} href={url + contentUrl} target='_blank'>
                <Icon width={20} height={20} color='white' />
              </Link>
              <p className={classes['media-icon-name']}>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes['popover-footer']}>
        <Clickable onClick={copyUrlHandler} className={classes['copy-container']}>
          <CopyIcon />
        </Clickable>
        <p className={classes['copy-text']}>Nusxalash</p>
      </div>
    </div>
  );
});
