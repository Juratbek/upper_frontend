import { Button, Spinner } from 'components/lib';
import { FC } from 'react';

export const LoadMoreButton: FC<{
  onClick: () => unknown;
  loading?: boolean;
  className?: string;
}> = (props) => (
  <Button
    color='tertiary'
    style={{
      fontSize: 20,
      width: '100%',
    }}
    onClick={props.onClick}
    disabled={props.loading}
    className={props.className}
  >
    {props.loading ? <Spinner /> : 'Yana yuklash'}
  </Button>
);
