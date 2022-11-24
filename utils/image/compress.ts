import { OutputBlockData } from '@editorjs/editorjs';

import { UNSPLASH_URL } from '../../store/apis';

const resizeImageElement = (img: HTMLImageElement): string => {
  const canvas = document.createElement('canvas');

  const max_width = 1000;
  const max_height = 1000;
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > max_width) {
      height = Math.round((height *= max_width / width));
      width = max_width;
    }
  } else if (height > max_height) {
    width = Math.round((width *= max_height / height));
    height = max_height;
  }
  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx && ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.9);
};

export const compressImage = (img: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img);

    fileReader.onload = (event): void => {
      if (!event.target || !event.target.result) return reject(event);

      const newImg = new Image();
      newImg.src = event.target.result as string;

      newImg.onload = async (): Promise<void> => {
        const compressed = resizeImageElement(newImg);
        const res = await fetch(compressed);
        const blob = await res.blob();
        resolve(new File([blob], img.name, { type: img.type }));
      };

      newImg.onerror = reject;
    };

    fileReader.onerror = reject;
  });
};

export const compressDataImage = (dataImg: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const newImg = new Image();
    newImg.src = dataImg as string;

    newImg.onload = async (): Promise<void> => {
      const compressed = resizeImageElement(newImg);
      resolve(compressed);
    };

    newImg.onerror = reject;
  });
};

export const compressUnsplashImage = (block: OutputBlockData): OutputBlockData => {
  let url = block.data.url;

  if (url.startsWith(UNSPLASH_URL)) {
    const urlSearchParams = new URLSearchParams(url);

    while (urlSearchParams.get('amp;q')) {
      urlSearchParams.delete('amp;q');
    }

    urlSearchParams.set('q', '10');
    url = decodeURIComponent(urlSearchParams.toString());

    return {
      ...block,
      data: {
        ...block.data,
        url: url,
      },
    };
  }

  return block;
};
