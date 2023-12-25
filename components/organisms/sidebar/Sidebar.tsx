import { ConnectTelegram } from '../connect-telegram';
import classes from './Sidebar.module.scss';

export const Sidebar = (): JSX.Element => {
  return (
    <div className={classes.root}>
      <ConnectTelegram />
    </div>
  );
};
