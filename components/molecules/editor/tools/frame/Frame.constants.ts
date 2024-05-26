import { IBlockData } from '../../instance/Editor.types';
import { ITool } from '../tool.types';
import { Frame } from './Frame.tool';
import { IFrameData } from './Frame.types';

export const FrameTool: ITool = {
  block: Frame,
  tags: ['figure', 'iframe'],
  onPaste: (node) => {
    const element = node as HTMLElement;
    let frame: HTMLIFrameElement | null;

    if (element.nodeName === 'IFRAME') {
      frame = element as HTMLIFrameElement;
    } else {
      frame = element.querySelector('iframe');
    }

    if (!frame) return null;

    return {
      src: frame.src,
      width: Number(frame.width),
      height: Number(frame.height),
    } satisfies IBlockData<IFrameData>['data'];
  },
};
