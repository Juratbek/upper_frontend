import EditorJs from '@editorjs/editorjs';
import { EditorSpinner } from 'components';
import { FC, useEffect, useRef, useState } from 'react';

import { useEmoji } from '../../hooks';
import { ImageModal } from '../ImageModal';
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
  const [images, setImages] = useState<HTMLElement[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const { handleInstance, isEditable = true } = props;

  useEmoji(editor);
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

  const onImgInserted = (e: Event): void => {
    const target = e.target as HTMLElement;
    const img = target.querySelector('img');
    img && setImages((prevState) => [...prevState, img]);

    if (target.classList.contains(CAPTION_CLASSES.inlineImageCaption)) cleanImageCaption(target);
  };

  const zoomInImage = (): void => {
    Object.values(IMAGE_CONTAINER_CLASSES).forEach((className) => {
      if (className !== IMAGE_CONTAINER_CLASSES.inlineImage) {
        containerRef.current?.querySelectorAll(`.${className}`).forEach((imgContainer) => {
          const img = imgContainer.querySelector('img');
          img && setImages((prevState) => [...prevState, img]);
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
      const renderFunc = editor.render;
      editor.render = function (...args): Promise<void> {
        setImages([]);
        return renderFunc.apply(this, args).then(() => {
          if (!isEditable) zoomInImage();
        });
      };
    });
  }, [editor]);

  return (
    <>
      {isEditorLoading && <EditorSpinner />}
      <div id={EDITOR_HOLDER} ref={containerRef} className={!isEditable ? 'readMode' : ''}></div>
      <ImageModal images={images} />
    </>
  );
};
