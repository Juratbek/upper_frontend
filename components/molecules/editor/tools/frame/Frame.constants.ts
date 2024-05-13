import { IBlockData } from '../../instance/Editor.types';
import { ITool } from '../tool.types';
import { Frame } from './Frame.tool';
import { IFrameData } from './Frame.types';

export const FrameTool: ITool = {
  block: Frame,
  tags: ['figure'],
  onPaste: (node) => {
    const figure = node as HTMLElement;
    const frame = figure.querySelector('iframe');

    if (!frame) return null;

    return {
      src: frame.src,
      width: Number(frame.width),
      height: Number(frame.height),
    } satisfies IBlockData<IFrameData>['data'];
  },
};
