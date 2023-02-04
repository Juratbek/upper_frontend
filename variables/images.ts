import { NotFoundImg } from 'assets';
import { TImage } from 'types';

export const IMAGE_TYPES = {
  notFound: 'not-found',
};

export const IMAGES: Record<TImage, () => JSX.Element> = {
  notFound: NotFoundImg,
};
