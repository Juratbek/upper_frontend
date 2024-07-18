import { ITool } from '../tool.types';
import { Figure } from './Figure.tool';
import { IFigureData } from './Figure.types';

export const FigureTool: ITool = {
  block: Figure,
  onPaste: (node) => {
    const figure = node as HTMLElement;

    const iframe = figure.querySelector('iframe');
    if (iframe) return frameHandler(iframe, figure);

    const picture = figure.querySelector('img');
    if (picture) return pictureHandler(picture, figure);

    return null;
  },
};

function frameHandler(iframe: HTMLIFrameElement, figure: HTMLElement) {
  const figcaption = figure.querySelector('figcaption');
  const caption = figcaption?.innerHTML;

  return {
    src: iframe.src,
    width: Number(iframe.width),
    height: Number(iframe.height),
    caption: caption,
    element: 'frame',
  } satisfies IFigureData;
}

function pictureHandler(picture: HTMLImageElement, figure: HTMLElement) {
  const figcaption = figure.querySelector('figcaption');
  const caption = figcaption?.innerHTML;

  return {
    src: picture.src,
    width: Number(picture.width),
    height: Number(picture.height),
    caption: caption,
    element: 'picture',
  } satisfies IFigureData;
}
