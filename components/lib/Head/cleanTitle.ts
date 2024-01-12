export function cleanTitle(text = ''): string {
  if (!text) return '';
  const cleanedText = text.replace(/U+00A0/g, ' ');
  return cleanedText;
}
