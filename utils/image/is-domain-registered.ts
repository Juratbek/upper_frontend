import { ALLOWED_DOMAINS_FOR_IMAGES } from 'variables';

export const isDomainRegistered = (imgUrl: string): boolean => {
  for (let i = 0; i < ALLOWED_DOMAINS_FOR_IMAGES.length; i++) {
    const domain = ALLOWED_DOMAINS_FOR_IMAGES[i];
    const cleanUrl = imgUrl.replace('https://', '').replace('http://', '');
    if (cleanUrl.startsWith(domain)) return true;
  }

  return false;
};
