import { ApiErrorBoundary } from 'components';
import { Spinner, StorysetImage } from 'components/lib';
import { LoadMoreButton } from 'components/molecules';
import { NOTIFICATIONS } from 'constants/notification';
import { FC, useMemo } from 'react';
import {
  useNotificationsList,
  useReadNotification,
  useResetNotificationsCount,
} from 'store/clients/notification';

export const Notifications: FC = () => {
  useResetNotificationsCount();
  const fetchNotificationsRes = useNotificationsList();
  const { mutate: readNotification } = useReadNotification();

  const notifications = useMemo(() => {
    const { list: notifications } = fetchNotificationsRes;

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
        <div key={notification.id} onClick={() => readNotification(notification.id)}>
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
