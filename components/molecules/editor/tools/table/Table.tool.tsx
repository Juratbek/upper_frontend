import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { IToolProps } from '../tool.types';
import cls from './Table.module.scss';
import { ITableData } from './Table.types';

const defaultTableContent: ITableData['content'] = [['']];

export const Table: FC<IToolProps<ITableData>> = ({ data, isEditable }) => {
  const [content, setContent] = useState(data.content ?? defaultTableContent);

  const tableRef = useRef<HTMLTableElement>(null);

  const addRow = useCallback(() => {
    setContent((content) => {
      const editedContent = [...content];
      const columnCount = content[0].length;
      const newRow = Array(columnCount).fill('');
      editedContent.push(newRow);
      return editedContent;
    });
  }, []);

  const addColumn = useCallback(() => {
    setContent((content) => {
      const editedContent: ITableData['content'] = [];
      content.forEach((row) => {
        row.push('');
        editedContent.push(row);
      });
      return editedContent;
    });
  }, []);

  useEffect(() => {
    const table = tableRef.current;
    if (!table || !isEditable) return;
    const firstCell = table.querySelector('td');
    firstCell?.focus();
  }, []);

  const rowsCount = useMemo(() => content.length, [content.length]);

  return (
    <div>
      <table ref={tableRef} className={cls.table}>
        <tbody>
          {content.map((row, index) => {
            return (
              <tr key={index} className={cls.row}>
                {row.map((cell, index) => (
                  <td
                    contentEditable={isEditable}
                    className={cls.cell}
                    key={index}
                    dangerouslySetInnerHTML={{ __html: cell }}
                  />
                ))}
                {isEditable && (
                  <td onClick={addColumn} className={cls.cell}>
                    {index + 1 === Math.round(rowsCount / 2) ? '+' : ''}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={addRow} className={cls['add-row-btn']}>
        +
      </button>
    </div>
  );
};
