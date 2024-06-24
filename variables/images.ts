import { NotFoundImg } from 'assets';
import { TImage } from 'types';

export const IMAGE_TYPES = {
  notFound: 'not-found',
};

export const IMAGES: Record<TImage, () => JSX.Element> = {
  notFound: NotFoundImg,
};

export const ALLOWED_DOMAINS_FOR_IMAGES = [
  'images.unsplash.com',
  'lh3.googleusercontent.com',
  't.me',
  'avatars.githubusercontent.com',
  'upper-dev-article-img-bucket.s3.ap-south-1.amazonaws.com',
  'upper-dev-blog-img-bucket.s3.ap-south-1.amazonaws.com',
  'upper-dev-tutorial-img-bucket.s3.ap-south-1.amazonaws.com',
  'upper-prod-article-img-bucket.s3.ap-south-1.amazonaws.com',
  'upper-prod-blog-img-bucket.s3.ap-south-1.amazonaws.com',
  'media.licdn.com',
] as const;
