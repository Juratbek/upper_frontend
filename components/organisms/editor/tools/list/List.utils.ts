import { KeyboardEvent } from 'react';

import { IEditorAPI } from '../../context';
import { IBlockData } from '../../instance/Editor.types';
import { IListData } from './List.types';

export function handleListItemKeydown(
  event: KeyboardEvent<HTMLLIElement>,
  data: IListData,
  api: IEditorAPI,
  id: IBlockData['id'],
  type: IBlockData['type'],
  cb: VoidFunction,
) {
  const { code, metaKey: isMetaKey, target } = event;
  const { items, style } = data;
  const element = target as HTMLLIElement;

  // if user pressed Backspace -> remove list item
  if (code === 'Backspace' && element.innerText === '') {
    // if list has only one item -> remove list block
    if (items.length === 1) {
      api.removeBlock(id);
      return;
    }

    api.setBlock<IListData>({
      id,
      type,
      data: { items: items.slice(0, items.length - 1), style },
    });
    setTimeout(cb, 0);
  }

  // if user pressed Enter with ctrl or command add new paragraph
  if (code === 'Enter' && isMetaKey) {
    api.addBlock('paragraph', id);
    return;
  }

  // if user pressed Enter a new list item will be added
  if (code === 'Enter') {
    api.setBlock<IListData>({ id, type, data: { items: [...items, ''], style } });
    event.preventDefault();
    setTimeout(cb, 0);
  }
}
