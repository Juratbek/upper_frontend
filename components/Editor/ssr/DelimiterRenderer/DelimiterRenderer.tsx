import { RenderFn } from 'editorjs-blocks-react-renderer';

import styles from './DelimiterRenderer.module.scss';

export const DelimiterRenderer: RenderFn = () => {
  return <div className={styles['ce-delimiter']}></div>;
};
