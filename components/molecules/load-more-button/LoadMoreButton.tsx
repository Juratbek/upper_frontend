import { Button } from 'components/lib';
import { FC } from 'react';

export const LoadMoreButton: FC<{ onClick: () => unknown }> = (props) => (
  <Button
    color='tertiary'
    style={{
      fontSize: 20,
      width: '100%',
    }}
    onClick={props.onClick}
  >
    Yana yuklash
  </Button>
);
