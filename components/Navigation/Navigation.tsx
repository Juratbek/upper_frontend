import classes from './Navigation.module.css';

export const Navigation = (): JSX.Element => {
  return (
    <div className={classes.navigation}>
      <div className={`${classes.navigation} ${classes.positioned}`}>Navigation</div>
    </div>
  );
};
