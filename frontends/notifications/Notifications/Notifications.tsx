import { ApiErrorBoundary, NotificationSkeleton, Pagination } from 'components';
import { Divider, StorysetImage } from 'components/lib';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import {
  useDeleteNotification,
  useNotificationsList,
  useReadNotification,
  useResetNotificationsCount,
} from 'store/clients/notification';
import { INotification } from 'types';
import { NOTIFICATION_STATUSES, NOTIFICATIONS } from 'variables';

export const Notifications: FC = () => {
  const { mutate: sendReadNotificationReq } = useReadNotification();
  const { mutate: deleteNotificationReq } = useDeleteNotification();
  useResetNotificationsCount();
  const {
    query: { page },
  } = useRouter();
  const fetchNotificationsRes = useNotificationsList((page as string) ?? '0');

  useEffect(() => {
    document.querySelector('#main')?.scrollTo({ top: 0 });
  }, [page]);

  const readNotification = (notification: INotification): void => {
    markAsRead(notification);
  };

  const markAsRead = (notification: INotification): void => {
    sendReadNotificationReq(notification.id);
  };

  const deleteNotification = (notification: INotification): void => {
    deleteNotificationReq(notification.id);
  };

  const notifications = useMemo(() => {
    const { data } = fetchNotificationsRes;
    const notifications = data?.list ?? [];
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

    return notifications.map((notification, index) => {
      const Notification = NOTIFICATIONS[notification.type];

      if (!Notification) return <></>;
      return (
        <div key={notification.id}>
          <Notification
            onClick={readNotification}
            {...notification}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
          />
          {index !== notifications.length - 1 &&
            notification.status === NOTIFICATION_STATUSES.UNREAD && (
              <Divider className='w-90 mx-auto' style={{ marginTop: 2, marginBottom: 2 }} />
            )}
        </div>
      );
    });
  }, [fetchNotificationsRes.data]);

  return (
    <div>
      <ApiErrorBoundary
        res={fetchNotificationsRes}
        fallback={<NotificationSkeleton className='px-3 py-2' />}
        fallbackItemCount={3}
        className='tab pt-1'
      >
        {notifications}
      </ApiErrorBoundary>
      <div className='my-2'>
        {fetchNotificationsRes.data?.totalPages && (
          <Pagination pagesCount={fetchNotificationsRes.data.totalPages} />
        )}
      </div>
    </div>
  );
};