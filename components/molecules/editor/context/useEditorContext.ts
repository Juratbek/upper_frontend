import { useContext } from 'react';

import { EditorContext } from './EditorContext';

export const useEditorContext = () => useContext(EditorContext);
