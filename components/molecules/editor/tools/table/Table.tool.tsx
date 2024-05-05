import { FormEvent, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import cls from './Table.module.scss';
import { ITableData } from './Table.types';

export const defaultTableData: ITableData = { content: [['']], withHeadings: false };

const debounce = debouncer<string>();

export const Table = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<ITableData>) {
    const { content } = data;

    const tableRef = useRef<HTMLTableElement>(null);

    const setBlockContent = useCallback(
      (content: ITableData['content']) => {
        api.setBlock<ITableData>({
          id,
          type,
          data: { content, withHeadings: data.withHeadings },
        });
      },
      [id, type, data.withHeadings],
    );

    const addRow = useCallback(() => {
      const columnCount = content[0].length;
      const newRow = Array(columnCount).fill('');
      const newContent = [...content, newRow];

      setBlockContent(newContent);
    }, [setBlockContent, content]);

    const addColumn = useCallback(() => {
      const editedContent: ITableData['content'] = content.map((row) => [...row, '']);

      setBlockContent(editedContent);
    }, [setBlockContent, content]);

    const cellChangeHandler = useCallback(
      (rowIndex: number, cellIndex: number) => (event: FormEvent<HTMLTableCellElement>) => {
        const value = (event.target as HTMLTableCellElement).innerHTML;
        debounce(value, (v) => {
          content[rowIndex][cellIndex] = v;
          setBlockContent(content);
        });
      },
      [setBlockContent],
    );

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
            {content.map((row, rowIndex) => {
              return (
                <tr key={rowIndex} className={cls.row}>
                  {row.map((cell, cellIndex) => (
                    <td
                      onInput={cellChangeHandler(rowIndex, cellIndex)}
                      contentEditable={isEditable}
                      className={cls.cell}
                      key={cellIndex}
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                  {isEditable && (
                    <td onClick={addColumn} className={cls.cell}>
                      {rowIndex + 1 === Math.round(rowsCount / 2) ? '+' : ''}
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
  },
  (prevProps, currentProps) => {
    const prevData = prevProps.data;
    const currentData = currentProps.data;

    if (prevData.withHeadings !== currentData.withHeadings) return false;

    const prevContent = prevData.content;
    const currentContent = currentData.content;
    // if rows count has been changed -> rerender
    if (prevContent.length !== currentContent.length) return false;

    const prevFirstRow = prevContent[0];
    const currentFirstRow = currentContent[0];
    // if columns count has been changed -> rerender
    if (prevFirstRow?.length !== currentFirstRow?.length) return false;

    return true;
  },
);
