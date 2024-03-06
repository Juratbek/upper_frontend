import { ApiErrorBoundary, NotificationSkeleton } from 'components';
import { StorysetImage } from 'components/lib';
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
        <div key={notification.id} onClick={() => readNotification(notification.id)}>
          <Notification {...notification} />
        </div>
      );
    });
  }, [fetchNotificationsRes.data]);

  return (
    <ApiErrorBoundary
      res={fetchNotificationsRes}
      fallback={<NotificationSkeleton className='px-3 py-2' />}
      fallbackItemCount={3}
      className='tab pt-1'
    >
      {notifications}
    </ApiErrorBoundary>
  );
};
