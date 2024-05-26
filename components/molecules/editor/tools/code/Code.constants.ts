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
  shortcuts: ['k'],
  initialData: {
    language: 'javascript',
    code: '// Assalamu aleykum, upper.uz saytiga xush kelibsiz',
  } as ICodeData,
  onPaste: (node) => {
    const codeElement = node as HTMLPreElement;
    let code;

    const firstChild = codeElement.children[0];
    if (firstChild?.nodeName === 'CODE' && codeElement.children.length === 1) {
      code = replaceHtmlCharacters(firstChild.innerHTML);
      if (code.endsWith('\n')) {
        code = code.slice(0, -1);
      }
    } else {
      code = replaceHtmlCharacters(codeElement.innerHTML);
    }

    return {
      code,
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
