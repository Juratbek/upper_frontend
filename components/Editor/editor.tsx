import EditorJs from '@editorjs/editorjs';
import { Spinner } from 'assets/icons';
import { FC, useEffect, useRef, useState } from 'react';

import { ImageModal } from '../ImageModal';
import styles from './editor.module.scss';
import {
  CAPTION_CLASSES,
  EDITOR_HOLDER,
  IEditorProps,
  IMAGE_CONTAINER_CLASSES,
} from './editor.types';
import { createEditor } from './services/editor.service';

export const Editor: FC<IEditorProps> = (props) => {
  const [editor, setEditor] = useState<null | EditorJs>(null);
  const [isEditorLoading, setIsEditorLoading] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const { handleInstance, isEditable = true } = props;

  useEffect(() => {
    createEditor({
      ...props,
    }).then((res) => {
      setEditor(res);
      handleInstance?.(res);
    });
  }, []);

  const cleanImageCaption = (caption: Element): void => {
    if (!caption.textContent) {
      caption.remove();
    }
  };

  const onImgClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    const clonedImg = target.cloneNode(true);
    const imgModal = document.querySelector('#imgModal') as HTMLElement;
    const imgModalContent = imgModal.querySelector('#modalContent') as HTMLElement;
    imgModalContent.innerHTML = '';
    imgModalContent.appendChild(clonedImg);
    imgModal.style.display = 'block';
  };

  const onImgInserted = (e: Event): void => {
    const target = e.target as HTMLElement;
    const img = target.querySelector('img');
    img?.addEventListener('click', onImgClick);

    if (target.classList.contains(CAPTION_CLASSES.inlineImageCaption)) cleanImageCaption(target);
  };

  const zoomInImage = (): void => {
    Object.values(IMAGE_CONTAINER_CLASSES).forEach((className) => {
      if (className !== IMAGE_CONTAINER_CLASSES.inlineImage) {
        containerRef.current?.querySelectorAll(`.${className}`).forEach((imgContainer) => {
          const img = imgContainer.querySelector('img');
          img?.addEventListener('click', onImgClick);
        });
        return;
      }
      containerRef.current?.querySelectorAll(`.${className}`).forEach((imgContainer) => {
        imgContainer.addEventListener('DOMNodeInserted', onImgInserted);
      });
    });

    Object.values(CAPTION_CLASSES).forEach((className) => {
      if (className !== CAPTION_CLASSES.inlineImageCaption) {
        document.querySelectorAll(`.${className}`).forEach((caption) => {
          cleanImageCaption(caption);
        });
      }
    });
  };

  useEffect(() => {
    editor?.isReady.then(() => {
      setIsEditorLoading(false);
      if (!isEditable) zoomInImage();
    });

    return () => {
      if (isEditable) return;
      Object.values(IMAGE_CONTAINER_CLASSES).forEach((className) => {
        containerRef.current?.querySelectorAll(`.${className}`).forEach((imgContainer) => {
          if (className === IMAGE_CONTAINER_CLASSES.inlineImage)
            imgContainer.removeEventListener('DOMNodeInserted', onImgInserted);
          imgContainer.querySelector('img')?.removeEventListener('click', onImgClick);
        });
      });
    };
  }, [editor]);

  return (
    <>
      {isEditorLoading && (
        <div className={styles.spinnerContainer} id={'editorjsSpinner'}>
          <Spinner />
        </div>
      )}
      <div id={EDITOR_HOLDER} ref={containerRef} className={!isEditable ? 'readMode' : ''}></div>
      <ImageModal />
    </>
  );
};
