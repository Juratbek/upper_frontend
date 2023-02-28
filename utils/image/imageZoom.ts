import { BLOG_BUCKET_URL } from 'store/apis';

const GOOGLE_IMG_API = 'googleusercontent.com';
const GITHUB_IMG_API = 'avatars.githubusercontent.com';

export type TImageSources = 'google' | 'github' | 'upper' | 'telegram';

type TGetImageType = (imgUrl: string) => {
  type: TImageSources;
  zoomable: boolean;
};

export const getImageType: TGetImageType = (imgUrl) => {
  if (imgUrl.includes(GOOGLE_IMG_API))
    return {
      type: 'google',
      zoomable: false,
    };
  if (imgUrl.includes(BLOG_BUCKET_URL)) {
    return {
      type: 'upper',
      zoomable: true,
    };
  }

  if (imgUrl.includes(GITHUB_IMG_API)) {
    return {
      type: 'github',
      zoomable: false,
    };
  }

  return {
    type: 'telegram',
    zoomable: true,
  };
};
