export const isRemoteUrl = (url: string) => {
  if (!url) return undefined;
  if (url.startsWith('http')) return true;
  return false;
};
