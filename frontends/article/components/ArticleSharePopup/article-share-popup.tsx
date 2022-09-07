import { FC, useEffect, useRef } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

const TelegramIcon = ICONS[ICON_TYPES.telegram];
const FacebookIcon = ICONS[ICON_TYPES.facebook];
const LinkedInIcon = ICONS[ICON_TYPES.linkedIn];

import styles from './article-share-popup.module.scss';
import { IArticleSharePopupProps } from './article-share-popup.types';

const url = window.location.href;

export const ArticleSharePopup: FC<IArticleSharePopupProps> = ({ visible, setVisible }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const sharePopupRef = useRef<HTMLDivElement>(null);

  const onCopyLink = (): void => {
    const inputEl = inputRef.current as HTMLInputElement;
    if (inputEl) {
      inputEl.select();
      inputEl.setSelectionRange(0, 99999);

      navigator.clipboard.writeText(inputEl.value);
    }
  };

  useEffect(() => {
    const globalClickListener = (e: Event): void => {
      const sharePopupEl = sharePopupRef.current as HTMLDivElement;
      const targetEl = e.target as HTMLElement;

      if (e.target !== sharePopupEl && !sharePopupEl.contains(targetEl)) {
        setVisible(false);
      }
    };

    document.addEventListener('click', globalClickListener);

    return () => {
      window.removeEventListener('click', globalClickListener);
    };
  }, []);

  return (
    <div
      className={`${styles.popupContainer}${visible ? ' ' + styles.show : ''}`}
      ref={sharePopupRef}
    >
      <div className={styles.iconsContainer}>
        <a
          className={styles.socialIcon}
          target='_blank'
          href={`https://t.me/share/url?url=${url}&text=Test`}
          rel='noreferrer'
        >
          <TelegramIcon />
          <div className={styles.iconText}>Telegram</div>
        </a>
        <a
          target='_blank'
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          className={styles.socialIcon}
          rel='noreferrer'
        >
          <FacebookIcon />
          <div className={styles.iconText}>Facebook</div>
        </a>
        <a
          target='_blank'
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          className={styles.socialIcon}
          rel='noreferrer'
        >
          <LinkedInIcon />
          <div className={styles.iconText}>LinkedIn</div>
        </a>
      </div>
      <div className={styles.articleLink}>
        <input
          type='text'
          className={styles.linkInput}
          readOnly={true}
          value={url}
          ref={inputRef}
        />
        <button className={styles.copyButton} type={'button'} onClick={onCopyLink}>
          Nusxalash
        </button>
      </div>
    </div>
  );
};
