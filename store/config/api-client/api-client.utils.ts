export const checkContentType = (res: Response, contentTypeToCheck: string): boolean => {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes(contentTypeToCheck)) return true;
  return false;
};
