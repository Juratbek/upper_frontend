import { DoneIcon } from 'components/icons';
import { Clickable } from 'components/lib';
import Link from 'next/link';
import { forwardRef, useEffect, useState } from 'react';
import { TNoop } from 'types';
import { ICONS } from 'variables/icons';

import { MEDIA_ICONS } from './SharePopover.constants';
import classes from './SharePopover.module.scss';

const CopyIcon = ICONS.copy;

export const SharePopover = forwardRef<
  HTMLDivElement,
  { isOpen: boolean; closeSharePopover: TNoop }
>(function Component({ isOpen, closeSharePopover }, ref) {
  const [contentUrl, setContentUrl] = useState('');
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  const copyUrlHandler = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(contentUrl);
      setIsUrlCopied(true);
    } finally {
      setTimeout(() => {
        setIsUrlCopied(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setContentUrl(window.location.href);
  }, []);

  return (
    <div className={classes.popover} style={{ display: isOpen ? 'block' : 'none' }} ref={ref}>
      <div className={classes['popover-header']}>
        <p className={classes.headline}>Ulashish</p>
        <Clickable className={classes['close-icon']} onClick={closeSharePopover}>
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
          <div className={classes['copy-icon']}>
            {isUrlCopied ? (
              <DoneIcon width={24} height={24} />
            ) : (
              <CopyIcon width={24} height={24} />
            )}
          </div>
          <p className={classes['copy-text']}>{isUrlCopied ? 'Havola nusxalandi' : 'Nusxalash'}</p>
        </Clickable>
      </div>
    </div>
  );
});
