export function replaceWithSpace(text = ''): string {
  if (!text) return '';
  const cleanedText = text.replace(/&nbsp;/g, ' ');
  return cleanedText;
}
