import { RenderFn } from 'editorjs-blocks-react-renderer';

import commonStyles from '../Common.module.scss';
import { IQuoteData } from './IQuoteData.types';
import styles from './QuoteRenderer.module.scss';

export const QuoteRenderer: RenderFn<{ caption: string; text: string }> = ({
  data,
}: {
  data: IQuoteData;
}) => {
  return (
    <blockquote className={styles['cdx-quote']}>
      <div className={[commonStyles['cdx-input'], styles['cdx-quote__text']].join(' ')}>
        {data.text}
      </div>
      <div className={commonStyles['cdx-input']}>{data.caption}</div>
    </blockquote>
  );
};
