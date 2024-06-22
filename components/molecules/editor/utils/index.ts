import { EDITOR_BLOCKS_CONTAINER_ID, EDITOR_ROOT_ID } from '../instance/Editor';

export function getEditorBlocksContainer() {
  return document.getElementById(EDITOR_BLOCKS_CONTAINER_ID);
}

export function getEditorRoot() {
  return document.getElementById(EDITOR_ROOT_ID);
}
