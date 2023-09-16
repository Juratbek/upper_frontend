import { RenderFn } from 'editorjs-blocks-react-renderer';

import styles from './AlertRenderer.module.scss';

interface IAlertData {
  type: string;
  message: string;
}

export const AlertRenderer: RenderFn<{ type: string; message: string }> = ({
  data,
}: {
  data: IAlertData;
}) => {
  return (
    <div className={`${styles['cdx-alert']} ${styles['cdx-alert-' + data.type]} cdx-alert`}>
      <div className={styles['cdx-alert__message']}>{data.message}</div>
    </div>
  );
};
