import { FC, useRef } from 'react';
import { ICONS } from 'variables';

const TelegramIcon = ICONS.telegram;
const FacebookIcon = ICONS.facebook;
const LinkedInIcon = ICONS.linkedIn;

import { Button } from 'components';
import { useClickOutside, useClipboard } from 'hooks';

import styles from './article-share-popup.module.scss';
import { IArticleSharePopupProps } from './article-share-popup.types';

const url = window.location.href;

export const ArticleSharePopup: FC<IArticleSharePopupProps> = ({ visible, setVisible }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { writeText, isLoading, isCopied, isError } = useClipboard();

  const onCopyLink = (): void => {
    const inputEl = inputRef.current as HTMLInputElement;
    if (inputEl) {
      inputEl.select();
      inputEl.setSelectionRange(0, 99999);

      writeText(inputEl.value);
    }
  };

  const [sharePopupRef] = useClickOutside(() => setVisible(false));

  const getBtnText = (): string => {
    if (isError) return 'Xatolik';
    if (isCopied) return 'Nusxalandi';
    return 'Nusxalash';
  };

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
        <Button
          loading={isLoading}
          className={styles.copyButton}
          color={isCopied ? 'dark' : 'outline-dark'}
          type='button'
          onClick={onCopyLink}
        >
          {getBtnText()}
        </Button>
      </div>
    </div>
  );
};
