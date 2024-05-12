import { IconBrackets } from '@codexteam/icons';

import { IBlockData } from '../../instance/Editor.types';
import { ITool } from '../tool.types';
import { Code } from './Code.tool';
import { ICodeData } from './Code.types';

export const CodeTool: ITool = {
  toolbar: {
    text: 'Kod',
    icon: IconBrackets,
  },
  block: Code,
  tags: ['pre'],
  onPaste: (node) => {
    const codeElement = node as HTMLPreElement;

    return {
      code: replaceHtmlCharacters(codeElement.innerHTML),
      language: 'javascript',
    } satisfies IBlockData<ICodeData>['data'];

    return null;
  },
};

function replaceHtmlCharacters(htmlString: string): string {
  return htmlString
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}
