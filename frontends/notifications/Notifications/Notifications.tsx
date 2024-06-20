import { ApiErrorBoundary } from 'components';
import { Spinner, StorysetImage } from 'components/lib';
import { LoadMoreButton } from 'components/molecules';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import {
  useNotificationsList,
  useReadNotification,
  useResetNotificationsCount,
} from 'store/clients/notification';
import { NOTIFICATIONS } from 'variables/notification';

export const Notifications: FC = () => {
  useResetNotificationsCount();
  const {
    query: { page },
  } = useRouter();
  const fetchNotificationsRes = useNotificationsList();
  const { mutate: readNotification } = useReadNotification();

  useEffect(() => {
    document.querySelector('#main')?.scrollTo({ top: 0 });
  }, [page]);

  const notifications = useMemo(() => {
    const { list } = fetchNotificationsRes;
    const notifications = list;
    if (!notifications || notifications.length === 0)
      return (
        <div className='text-center'>
          <StorysetImage
            src='/storyset/notifications.svg'
            width={250}
            height={250}
            storysetUri='internet'
          />
          <p>Bloglarga obuna bo&apos;ling va maqolalar haqida xabarlar oling</p>
          <p className='fs-1'>Hozirda xabarlar mavjud emas</p>
        </div>
      );

    return notifications.map((notification) => {
      const Notification = NOTIFICATIONS[notification.type];

      if (!Notification) return <></>;
      return (
        <div
          key={notification.id}
          className='container'
          onClick={() => readNotification(notification.id)}
        >
          <Notification {...notification} />
        </div>
      );
    });
  }, [fetchNotificationsRes.data]);

  return (
    <ApiErrorBoundary
      res={fetchNotificationsRes}
      fallback={
        <div style={{ height: '15rem' }} className='content-center'>
          <Spinner />
        </div>
      }
      className='tab'
    >
      {notifications}
      {fetchNotificationsRes.hasNextPage && (
        <LoadMoreButton
          className='mt-2'
          onClick={fetchNotificationsRes.fetchNextPage}
          loading={fetchNotificationsRes.isFetchingNextPage}
        />
      )}
    </ApiErrorBoundary>
  );
};
