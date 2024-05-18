import janitor from './janitor';

export function getNodes(html: string): Node[] {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  return Array.from(wrapper.childNodes);
}

export function isEmpty(element: HTMLElement): boolean {
  const textContent = janitor.clean(element.innerHTML, { onlyText: true });
  return textContent === '';
}
