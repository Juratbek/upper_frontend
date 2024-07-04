import { Button } from 'components/lib';
import { useAuth } from 'hooks';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscribe, useSubscriptionStatus } from 'store/clients/subscription';
import { openUnsubscribeModal } from 'store/states';

export const SubscriptionButton: FC<{ blogId: number; className?: string }> = ({
  blogId,
  className,
}) => {
  const { data: isSubscribed, isPending } = useSubscriptionStatus(blogId);
  const { mutate: subscribe, isPending: isBeingSubscribed } = useSubscribe(blogId);
  const dispatch = useDispatch();
  const { status: authStatus, openLoginPage } = useAuth();

  const unsubscribeHandler = (): unknown => dispatch(openUnsubscribeModal(blogId));

  const subscribeHandler = () => {
    if (authStatus === 'authenticated') subscribe();
    if (authStatus === 'unauthenticated') openLoginPage("Obuna bo'lish uchun ro'yxatdan o'ting");
  };

  if (isPending) return <></>;

  if (isSubscribed)
    return (
      <Button className={className} color='tertiary' onClick={unsubscribeHandler}>
        Obuna bo&apos;lingan
      </Button>
    );

  return authStatus === 'loading' ? null : (
    <Button className={className} onClick={subscribeHandler} loading={isBeingSubscribed}>
      Obuna bo&apos;lish
    </Button>
  );
};
