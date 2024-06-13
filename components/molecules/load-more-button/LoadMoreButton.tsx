import { Button, Spinner } from 'components/lib';
import { FC } from 'react';

export const LoadMoreButton: FC<{ onClick: () => unknown; loading?: boolean }> = (props) => (
  <Button
    color='tertiary'
    style={{
      fontSize: 20,
      width: '100%',
    }}
    onClick={props.onClick}
    disabled={props.loading}
  >
    {props.loading ? <Spinner /> : 'Yana yuklash'}
  </Button>
);
