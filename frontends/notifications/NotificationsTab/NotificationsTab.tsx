import { ApiErrorBoundary, Divider, Pagination } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useLazyGetNotificationsByTypeQuery, useReadNotificationMutation } from 'store/apis';
import { INotification } from 'types';
import { NOTIFICATIONS, PAGINATION_SIZE } from 'variables';

export const NotificationsTab: FC = () => {
  const [fetchNotifications, fetchNotificationsRes] = useLazyGetNotificationsByTypeQuery();
  const [sendReadNotificationReq] = useReadNotificationMutation();
  const {
    query: { tab, page },
    push,
  } = useRouter();

  useEffect(() => {
    const p = (page as unknown as number) || 1;
    tab && fetchNotifications({ type: tab as string, page: p - 1 });
  }, [tab, page]);

  const readNotification = (notification: INotification): void => {
    const { id, article } = notification;
    sendReadNotificationReq(id);
    push(`/articles/${article.id}`);
  };

  const notifications = useMemo(() => {
    const { data } = fetchNotificationsRes;
    const notifications = data?.list || [];
    if (!notifications || notifications.length === 0)
      return <p className='text-center'>Habarlar mavjud emas</p>;

    return notifications.map((notification, index) => {
      const Notification = NOTIFICATIONS[notification.type];
      return (
        <div key={notification.id}>
          <Notification onClick={readNotification} {...notification} className='p-2' />
          {index !== notifications.length - 1 && <Divider className='w-75 mx-auto' />}
        </div>
      );
    });
  }, [fetchNotificationsRes.data]);

  return (
    <div>
      <ApiErrorBoundary res={fetchNotificationsRes} className='tab'>
        {notifications}
      </ApiErrorBoundary>
      {fetchNotificationsRes.data && (
        <Pagination count={fetchNotificationsRes.data.totalItemCount / PAGINATION_SIZE} />
      )}
    </div>
  );
};
