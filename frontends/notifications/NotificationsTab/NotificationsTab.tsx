import { ApiErrorBoundary, Divider } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useLazyGetNotificationsByTypeQuery } from 'store/apis';
import { NOTIFICATIONS } from 'variables';

export const NotificationsTab: FC = () => {
  const [fetchNotifications, fetchNotificationsRes] = useLazyGetNotificationsByTypeQuery();
  const {
    query: { tab },
  } = useRouter();

  useEffect(() => {
    tab && fetchNotifications(tab as string);
  }, [tab]);

  const notifications = useMemo(() => {
    const { data: notifications } = fetchNotificationsRes;
    if (!notifications || notifications.length === 0)
      return <p className='text-center'>Habarlar mavjud emas</p>;

    return notifications.map((notification, index) => {
      const Notification = NOTIFICATIONS[notification.type];
      // return <pre key={notification.id}>{JSON.stringify(notification, null, 2)}</pre>;
      return (
        <div key={notification.id}>
          <Notification {...notification} className='p-2' />
          {index !== notifications.length - 1 && <Divider className='w-75 mx-auto' />}
        </div>
      );
    });
    // return notifications.map((notification, index) => {
    //   const Notification = getNotificationComponent(notification.type);
    //   const actions = NOTIFICATIONS[notification.type].actions;
    //   return (
    //     <div key={notification.id}>
    //       <Notification {...notification} actions={actions} className='px-2 py-2' />
    //       {index !== notifications.length - 1 && <Divider className='w-75 mx-auto' />}
    //     </div>
    //   );
    // });
  }, [fetchNotificationsRes.data]);

  return (
    <ApiErrorBoundary res={fetchNotificationsRes} className='tab'>
      {notifications}
    </ApiErrorBoundary>
  );
};
