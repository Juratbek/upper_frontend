import { FC, RefObject, useEffect, useRef } from 'react';
import { ICONS } from 'variables';

const TelegramIcon = ICONS.telegram;
const FacebookIcon = ICONS.facebook;
const LinkedInIcon = ICONS.linkedIn;

import { Button } from 'components';
import { useClickOutside, useClipboard, useTheme } from 'hooks';
import { addKeyboardListener } from 'utils';

import styles from './article-share-popup.module.scss';
import { IArticleSharePopupProps } from './article-share-popup.types';

const url = window.location.href;

export const ArticleSharePopup: FC<IArticleSharePopupProps> = ({
  id,
  className,
  visible,
  setVisible,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { writeText, isLoading, isCopied, isError } = useClipboard();
  const { themeColors } = useTheme();

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

  useEffect(() => {
    const popover = (sharePopupRef as RefObject<HTMLDivElement>).current;
    if (popover) {
      const targetOffSetTop = (document.getElementById(id) as HTMLDivElement).offsetTop;
      const popoverHeight = popover.getBoundingClientRect().height;
      popover.style.top = targetOffSetTop - popoverHeight - 24 + 'px';
    }
  }, []);

  useEffect(() => {
    const listener = addKeyboardListener({ key: 'Escape' }, () => setVisible(false));
    return listener.clear;
  }, []);

  return (
    <div
      className={`${styles.popupContainer}${visible ? ' ' + styles.show : ''} ${className}`}
      style={{
        backgroundColor: themeColors.bg,
        borderColor: themeColors.popover.border,
      }}
      ref={sharePopupRef}
    >
      <div className={styles.iconsContainer}>
        <a
          className={styles.socialIcon}
          target='_blank'
          href={`https://t.me/share/url?url=${url}`}
          rel='noreferrer'
        >
          <TelegramIcon color={themeColors.icon} />
          <div className={styles.iconText}>Telegram</div>
        </a>
        <a
          target='_blank'
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          className={styles.socialIcon}
          rel='noreferrer'
        >
          <FacebookIcon color={themeColors.icon} />
          <div className={styles.iconText}>Facebook</div>
        </a>
        <a
          target='_blank'
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          className={styles.socialIcon}
          rel='noreferrer'
        >
          <LinkedInIcon color={themeColors.icon} />
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
          style={{ borderColor: themeColors.input.border }}
        />
        <Button
          loading={isLoading}
          className={styles.copyButton}
          type='button'
          onClick={onCopyLink}
        >
          {getBtnText()}
        </Button>
      </div>
    </div>
  );
};
