import { TelegramLoginButton } from 'components';
import { Alert, Avatar } from 'components/lib';
import { useAuth } from 'hooks';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  useGetTelegramAccountConnectedBlogsMutation,
  useLoginWithTelegramMutation,
} from 'store/apis';
import { IBlogSmall, IResponseError, ITelegramUser } from 'types';
import { addAmazonUri } from 'utils';

export const TelegramLogin: FC<{ onAuth?: () => void }> = (props) => {
  const [alert, setAlert] = useState<string>();
  const [blogs, setBlogs] = useState<IBlogSmall[]>([]);
  const [telegramUser, setTelegramUser] = useState<ITelegramUser>();
  const [loginWithTelegram, loginWithTelegramRes] = useLoginWithTelegramMutation();
  const [getConnectedBlogs, connectedBlogsRes] = useGetTelegramAccountConnectedBlogsMutation();
  const { authenticate } = useAuth();

  const authHandler = useCallback(async (telegramUser: ITelegramUser) => {
    const blogs = await getConnectedBlogs(telegramUser).unwrap();
    if (blogs.length === 1) {
      const [blog] = blogs;
      selectBlogHandler(blog, telegramUser)();
      return;
    }
    setBlogs(blogs);
    setTelegramUser(telegramUser);
  }, []);

  const selectBlogHandler = useCallback(
    (blog: IBlogSmall, telegramUser?: ITelegramUser) => async () => {
      if (!telegramUser) return Promise.reject();
      try {
        const authData = await loginWithTelegram({ blogId: blog.id, telegramUser }).unwrap();
        authenticate(authData);
        props.onAuth?.();
      } catch (e) {
        const error = e as IResponseError;
        setAlert(error.data?.message || "Xatolik yuz berdi, iltimos qaytadan urinib ko'ring");
        setBlogs([]);
      }
    },
    [telegramUser],
  );

  const blogsUI = useMemo(
    () => (
      <div className='mt-1'>
        <h3 className='mb-1 text-center'>Kirish uchun profilingizni tanlang</h3>
        {blogs.map((blog) => (
          <div
            className='d-flex align-items-center f-gap-1 p-1 pointer hoverable-light'
            key={blog.id}
            onClick={selectBlogHandler(blog, telegramUser)}
          >
            <Avatar size='medium' imgUrl={addAmazonUri(blog).imgUrl} />
            <h4 className='m-0'>{blog.name}</h4>
          </div>
        ))}
      </div>
    ),
    [blogs, selectBlogHandler],
  );

  return (
    <div>
      <Alert color='red' className='mt-1' show={Boolean(alert)}>
        {alert}
      </Alert>
      {blogs.length > 1 ? (
        blogsUI
      ) : (
        <TelegramLoginButton
          className='mt-1 text-center'
          isLoading={loginWithTelegramRes.isLoading || connectedBlogsRes.isLoading}
          botName={process.env.NEXT_PUBLIC_BOT_USERNAME || 'upperuz_bot'}
          onAuth={authHandler}
        />
      )}
    </div>
  );
};
