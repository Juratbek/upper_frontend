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
} from 'store/apis';
import { INotification } from 'types';
import { NOTIFICATION_STATUSES, NOTIFICATIONS, PAGINATION_SIZE } from 'variables';

export const NotificationsTab: FC = () => {
  const [fetchNotifications, fetchNotificationsRes] = useLazyGetNotificationsByTypeQuery();
  const [sendReadNotificationReq, sendReadNotificationRes] = useReadNotificationMutation();
  const [deleteNotificationReq, deleteNotificationRes] = useDeleteNotificationMutation();
  const {
    query: { tab, page },
    push,
  } = useRouter();

  useEffect(() => {
    const p = (page as unknown as number) || 1;
    tab && fetchNotifications({ type: tab as string, page: p - 1 });
  }, [tab, page]);

  const readNotification = (notification: INotification): void => {
    const { article } = notification;
    markAsRead(notification);
    push(`/articles/${article.id}`);
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
            width={350}
            height={350}
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
            className='p-2'
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
            loading={sendReadNotificationRes.isLoading || deleteNotificationRes.isLoading}
          />
          {index !== notifications.length - 1 && (
            <Divider
              className='w-75 mx-auto'
              color={
                notification.status === NOTIFICATION_STATUSES.UNREAD ? 'transparent' : undefined
              }
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
        className='tab'
      >
        {notifications}
      </ApiErrorBoundary>
      {fetchNotificationsRes.data && (
        <Pagination count={fetchNotificationsRes.data.totalItemCount / PAGINATION_SIZE} />
      )}
    </div>
  );
};
