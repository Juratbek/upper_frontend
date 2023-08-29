export function getCaretCoordinates(element: HTMLElement, position: number): DOMRect {
  const range = document.createRange();

  let totalOffset = 0;
  let textNode: Node | null = null;

  // Find the text node that contains the position
  const findTextNode = function (node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const len = (node.textContent as string).length;
      if (totalOffset <= position && totalOffset + len >= position && !textNode) {
        textNode = node;
      }
      totalOffset += len;
    } else {
      for (let i = 0, len = node.childNodes.length; i < len; ++i) {
        findTextNode(node.childNodes[i]);
      }
    }
  };

  findTextNode(element);

  // Set the range to the caret position
  // @ts-ignore
  range.setStart(textNode, position - (totalOffset - textNode.textContent.length));
  // @ts-ignore
  range.setEnd(textNode, position - (totalOffset - textNode.textContent.length));

  // Get the bounding rectangle of the range
  return range.getBoundingClientRect();
}

export function getCaretCharacterOffsetWithin(element: HTMLElement): number {
  let caretOffset = 0;
  const sel = window.getSelection() as Selection;
  if (sel.rangeCount > 0) {
    const range = sel.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }
  return caretOffset;
}

export function replaceRange(start: number, end: number, el: HTMLElement, newText: string): void {
  const range = document.createRange();
  const sel = window.getSelection() as Selection;

  let totalOffset = 0;
  let startTextNode: Node | null = null;
  let endTextNode: Node | null = null;

  const findTextNodes = function (node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const textContentLength = (node.textContent as string).length;
      if (totalOffset <= start && totalOffset + textContentLength >= start) {
        startTextNode = node;
      }
      if (totalOffset <= end && totalOffset + textContentLength >= end) {
        endTextNode = node;
      }
      totalOffset += textContentLength;
    } else {
      for (let i = 0, len = node.childNodes.length; i < len; ++i) {
        findTextNodes(node.childNodes[i]);
      }
    }
  };

  findTextNodes(el);
  // Extract the range from the text nodes
  // @ts-ignore
  range.setStart(startTextNode, start - (totalOffset - startTextNode.textContent.length));
  // @ts-ignore
  range.setEnd(endTextNode, end - totalOffset + endTextNode.textContent.length);

  // Create and insert the new element

  // Workaround for length error in editorjs
  const newElement: Node = document.createTextNode(newText);

  const parentElement = (
    range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentElement
      : range.commonAncestorContainer
  ) as HTMLElement;

  range.deleteContents();
  range.insertNode(newElement);
  range.setStartAfter(newElement);
  range.setEndAfter(newElement);
  // Reset the selection to include the new element
  // range.selectNodeContents(newElement);
  sel.removeAllRanges();
  sel.addRange(range);

  parentElement.normalize();
}
