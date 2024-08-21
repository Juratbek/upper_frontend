import { IconTable } from '@codexteam/icons';

import { ITool } from '../tool.types';
import { defaultTableData, Table } from './Table.tool';
import { ITableData } from './Table.types';

export const TableTool: ITool = {
  toolbar: {
    text: 'Jadval',
    icon: IconTable,
  },
  shortcuts: ['j'],
  initialData: defaultTableData satisfies ITableData,
  block: Table,
  inlineToolEnabled: true,
  tags: ['table'],
};
