import HTMLJanitor from 'html-janitor';
import { useCallback, useEffect } from 'react';

const allowedTags = {
  p: {},
  a: { href: true, target: true },
  code: {},
  strong: {},
  b: {},
  i: {},
  em: {},
  span: {},
};

export const usePasteListener = () => {
  const pasteHandler = useCallback((event: ClipboardEvent) => {
    const { clipboardData } = event;
    if (!clipboardData) return;
    const janitor = new HTMLJanitor({ tags: allowedTags });
    const htmlData = clipboardData.getData('text/html');

    const cleanHtml = janitor.clean(htmlData);
    console.log('🚀 ~ pasteHandler ~ cleanHtml:', cleanHtml);
  }, []);

  useEffect(() => {
    document.addEventListener('paste', pasteHandler);

    return () => document.removeEventListener('paste', pasteHandler);
  }, [pasteHandler]);
};
