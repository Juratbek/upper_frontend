import EditorJs from '@editorjs/editorjs';
import { FC, useEffect, useRef, useState } from 'react';

import { ImageModal } from '../ImageModal';
import { EDITOR_HOLDER, IEditorProps } from './editor.types';
import { createEditor } from './services/editor.service';

export const Editor: FC<IEditorProps> = (props) => {
  const [editor, setEditor] = useState<null | EditorJs>(null);
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

  const cleanEmptyCaptions = (): void => {
    const captions = document.querySelectorAll('.embed-tool__caption');

    captions.forEach((caption) => {
      if (!caption.textContent) {
        caption.remove();
      }
    });
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
  };

  const zoomInImage = (): void => {
    containerRef.current?.querySelectorAll('.inline-image').forEach((imgContainer) => {
      imgContainer.addEventListener('DOMNodeInserted', onImgInserted);
    });
  };

  useEffect(() => {
    editor?.isReady.then(() => {
      cleanEmptyCaptions();
      if (!isEditable) zoomInImage();
    });

    return () => {
      containerRef.current?.querySelectorAll('.inline-image').forEach((imgContainer) => {
        if (!isEditable) {
          imgContainer.removeEventListener('DOMNodeInserted', onImgInserted);
          imgContainer.querySelector('img')?.removeEventListener('click', onImgClick);
        }
      });
    };
  }, [editor]);

  return (
    <>
      <div id={EDITOR_HOLDER} ref={containerRef} className={!isEditable ? 'readMode' : ''}></div>
      <ImageModal />
    </>
  );
};
