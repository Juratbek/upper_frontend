import { Divider } from 'components';
import { IComment } from 'types';

import classes from './Comments.module.scss';
import { Comment, Form } from './components';

const author = {
  id: 1,
  imgUrl: '',
  name: 'Test',
};

const comments: IComment[] = [
  {
    id: 1,
    message: 'Lorem ipsum dolor',
    date: new Date().toString(),
    author,
  },
  {
    id: 2,
    message: 'Lorem ipsum dolor',
    date: new Date().toString(),
    author,
  },
  {
    id: 3,
    message: 'Lorem ipsum dolor',
    date: new Date().toString(),
    author,
  },
  {
    id: 4,
    message: 'Lorem ipsum dolor',
    date: new Date().toString(),
    author,
  },
  {
    id: 5,
    message: 'Lorem ipsum dolor',
    date: new Date().toString(),
    author,
  },
];

export const Comments = (): JSX.Element => {
  return (
    <div className={classes['comments-container']}>
      <div className={classes['comments-list']}>
        <h3 className='m-1'>Izohlar</h3>
        <Divider />
        {comments.map((comment) => (
          <Comment {...comment} key={comment.id} />
        ))}
      </div>
      <div className={classes.form}>
        <Form />
      </div>
    </div>
  );
};
