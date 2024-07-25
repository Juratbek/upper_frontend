import { IToolProps } from '../tool.types';
import classes from './Image.module.scss';
import { IImageData } from './Image.types';

export const Caption = ({
  isEditable,
  data,
}: Pick<IToolProps<IImageData>, 'isEditable' | 'data'>) => {
  const { caption } = data;

  if (isEditable) {
    return (
      <figcaption
        className={classes.caption}
        contentEditable
        dangerouslySetInnerHTML={{ __html: caption ?? '' }}
      />
    );
  }

  if (!caption) return;

  return <figcaption className={classes.caption} dangerouslySetInnerHTML={{ __html: caption }} />;
};
