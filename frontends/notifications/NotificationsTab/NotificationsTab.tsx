import {
  ApiErrorBoundary,
  Divider,
  NotificationSkeleton,
  Pagination,
  StorysetImage,
} from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import {
  useDeleteNotificationMutation,
  useLazyGetNotificationsByTypeQuery,
  useReadNotificationMutation,
  useResetNotificationsCountQuery,
} from 'store/apis';
import { INotification } from 'types';
import { NOTIFICATION_STATUSES, NOTIFICATIONS, PAGINATION_SIZE } from 'variables';

export const NotificationsTab: FC = () => {
  const [fetchNotifications, fetchNotificationsRes] = useLazyGetNotificationsByTypeQuery();
  const [sendReadNotificationReq, sendReadNotificationRes] = useReadNotificationMutation();
  const [deleteNotificationReq, deleteNotificationRes] = useDeleteNotificationMutation();
  useResetNotificationsCountQuery();
  const {
    query: { page },
  } = useRouter();

  useEffect(() => {
    const p = (page as unknown as number) || 1;
    fetchNotifications({ type: 'all', page: p - 1 });
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
    const notifications = data?.list || [];
    if (!notifications || notifications.length === 0)
      return (
        <div className='text-center'>
          <StorysetImage
            src='/storyset/notifications.svg'
            width={250}
            height={250}
            storysetUri='internet'
          />
          <p>Bloglarga obuna bo&apos;ling va maqolalar haqida habarlar oling</p>
          <p className='fs-1'>Hozirda habarlar mavjud emas</p>
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
            className='p-2 pointer'
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
            loading={sendReadNotificationRes.isLoading || deleteNotificationRes.isLoading}
          />
          {index !== notifications.length - 1 && (
            <Divider
              className='w-90 mx-auto'
              color={
                notification.status === NOTIFICATION_STATUSES.UNREAD ? 'transparent' : undefined
              }
              style={{ marginTop: 2, marginBottom: 2 }}
            />
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
        {fetchNotificationsRes.data && (
          <Pagination count={fetchNotificationsRes.data.totalItemCount / PAGINATION_SIZE} />
        )}
      </div>
    </div>
  );
};
