import { IBlockData } from 'components/molecules';

import { UNSPLASH_URL } from '../../store/apis';

type TCompressImageOptions = {
  medium: true;
};

const resizeImageElement = (img: HTMLImageElement, options?: TCompressImageOptions): string => {
  const isMedium = !!options?.medium;
  const canvas = document.createElement('canvas');
  const length = isMedium ? 2500 : 1000;

  const max_width = length;
  const max_height = length;
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

  const quality = isMedium ? 0.96 : 0.9;
  return canvas.toDataURL('image/jpeg', quality);
};

export const compressImage = (
  img: File,
  options?: TCompressImageOptions,
): Promise<{ file: File; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img);

    fileReader.onload = (event): void => {
      if (!event.target || !event.target.result) return reject(event);

      const newImg = new Image();
      newImg.src = event.target.result as string;

      newImg.onload = async (): Promise<void> => {
        const compressed = resizeImageElement(newImg, options);
        const res = await fetch(compressed);
        const blob = await res.blob();

        const width = newImg.width;
        const height = newImg.height;

        const compressedImage = new File([blob], img.name, { type: img.type });

        resolve({ file: compressedImage, width, height });
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

export const updateQueryParam = (url: string, q: string, value: string): string => {
  const urlSearchParams = new URLSearchParams(url);

  while (urlSearchParams.get(`amp;${q}`)) {
    urlSearchParams.delete(`amp;${q}`);
  }

  urlSearchParams.set(q, value);

  return decodeURIComponent(urlSearchParams.toString());
};

export const compressUnsplashImage = (block: IBlockData): IBlockData => {
  let url = block.data.url;

  if (url && url.startsWith(UNSPLASH_URL)) {
    url = updateQueryParam(url, 'q', '10');

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
