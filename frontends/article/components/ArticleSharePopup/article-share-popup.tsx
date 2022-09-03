import { FC, useRef } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

const TelegramIcon = ICONS[ICON_TYPES.telegram];
const FacebookIcon = ICONS[ICON_TYPES.facebook];
const LinkedInIcon = ICONS[ICON_TYPES.linkedIn];

import styles from './article-share-popup.module.scss';
import { IArticleSharePopupProps } from './article-share-popup.types';

export const ArticleSharePopup: FC<IArticleSharePopupProps> = ({ visible }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onCopyLink = (): void => {
    const inputEl = inputRef.current as HTMLInputElement;
    if (inputEl) {
      inputEl.select();
      inputEl.setSelectionRange(0, 99999);

      navigator.clipboard.writeText(inputEl.value);
    }
  };

  return (
    <div className={`${styles.popupContainer}${visible ? ' ' + styles.show : ''}`}>
      <div className={styles.iconsContainer}>
        <div className={styles.socialIcon}>
          <TelegramIcon />
          <div className={styles.iconText}>Telegram</div>
        </div>
        <div className={styles.socialIcon}>
          <FacebookIcon />
          <div className={styles.iconText}>Facebook</div>
        </div>
        <div className={styles.socialIcon}>
          <LinkedInIcon />
          <div className={styles.iconText}>LinkedIn</div>
        </div>
      </div>
      <div className={styles.articleLink}>
        <input
          type='text'
          className={styles.linkInput}
          readOnly={true}
          value={window.location.href}
          ref={inputRef}
        />
        <button className={styles.copyButton} type={'button'} onClick={onCopyLink}>
          Nusxalash
        </button>
      </div>
    </div>
  );
};
