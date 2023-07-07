export const selectAll = (element: Element): void => {
  if (!element) {
    console.error('Element is not profided for selecting');
    return;
  }
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};
