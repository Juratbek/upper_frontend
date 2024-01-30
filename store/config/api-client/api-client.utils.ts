export const checkContentType = (res: Response, contentTypeToCheck: string): boolean => {
  const contentType = res.headers.get('Content-Type');
  if (contentType && contentType.includes(contentTypeToCheck)) return true;
  return false;
};
