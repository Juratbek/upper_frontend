import { AlertTool } from './alert/Alert.constants';
import { CodeTool } from './code/Code.constants';
import { DelimiterTool } from './delimiter/Delimiter.constants';
import { FigureTool } from './figure/Figure.constants';
import { FrameTool } from './frame/Frame.constants';
import { HeaderTool } from './header/Header.constants';
import { ImageTool } from './image/Image.constants';
import { ListTool } from './list/List.constants';
import { ParagraphTool } from './paragraph/Paragraph.constants';
import { QuizTool } from './quiz/Quiz.constants';
import { QuoteTool } from './quote/Quote.constants';
import { TableTool } from './table/Table.constants';
import { TToolsMapper } from './tool.types';
import { Unsplash } from './unsplash/Unsplash.tool';

export const EDITOR_TOOLS: TToolsMapper = {
  paragraph: ParagraphTool,
  header: HeaderTool,
  image: ImageTool,
  unsplash: {
    block: Unsplash,
  },
  frame: FrameTool,
  code: CodeTool,
  delimiter: DelimiterTool,
  list: ListTool,
  alert: AlertTool,
  quote: QuoteTool,
  table: TableTool,
  figure: FigureTool,
  quiz: QuizTool,
} as const;
