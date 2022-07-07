import { Button } from 'components';

import classes from './Sidebar.module.css';

export const Sidebar = (): JSX.Element => {
  return (
    <div className={classes.sidebar}>
      <div className='d-flex justify-content-around'>
        <Button color='outline-dark'>Kirish</Button>
        <Button className='float-right'>Ro`yxatdan o`tish</Button>
      </div>
    </div>
  );
};
