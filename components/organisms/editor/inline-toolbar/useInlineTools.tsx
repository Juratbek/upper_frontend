import { useMemo } from 'react';

import { InlineToolBold } from '../inline-tools/bold';
import { InlineToolCode } from '../inline-tools/code';
import { InlineToolItalic } from '../inline-tools/italic';
import { InlineToolLink } from '../inline-tools/link';
import { IInlineTool } from './InlineToolbar.types';

export const useInlineTools = (): IInlineTool[] => {
  const tools = useMemo(
    (): IInlineTool[] => [InlineToolBold, InlineToolItalic, InlineToolLink, InlineToolCode],
    [],
  );

  return tools;
};
