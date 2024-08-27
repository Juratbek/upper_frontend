import { IEditorContext } from '../context/EditorContext.types';
import { IBlockData, IBlockNode } from '../instance/Editor.types';

export const generateBlockNode = (element: HTMLDivElement, block: IBlockData): IBlockNode => {
  // just creating new object from params will not work
  // because element is provided using react ref and stores reference to the reference node not to the actual element
  return Object.assign(element, {
    type: block.type,
    id: block.id,
    data: block.data,
  } satisfies IBlockData);
};

export function getCurrentBlock<T>({ data, hoveredBlock }: IEditorContext<T>) {
  return data.find((b) => hoveredBlock?.id === b.id);
}
