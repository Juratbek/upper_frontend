import { RenderFn } from 'editorjs-blocks-react-renderer';
import { ImageBlockData } from 'editorjs-blocks-react-renderer/dist/renderers/image';

import commonStyles from '../Common.module.scss';
import styles from './ImageRenderer.module.scss';

export const ImageRenderer: RenderFn<ImageBlockData> = ({ data }: { data: ImageBlockData }) => {
  return (
    <div className={[styles['inline-image'], 'inline-image'].join(' ')}>
      <div
        className={[
          styles['inline-image__picture'],
          data.stretched && styles['inline-image__picture--stretched'],
          data.withBorder && styles['inline-image__picture--withBorder'],
          data.withBackground &&
            [
              styles['inline-image__picture--withBackground'],
              'inline-image__picture--withBackground',
            ].join(' '),
        ].join(' ')}
      >
        <img src={data.url || data.file?.url} />
      </div>
      {data.caption && <div className={commonStyles['cdx-input']}>{data.caption}</div>}
    </div>
  );
};
