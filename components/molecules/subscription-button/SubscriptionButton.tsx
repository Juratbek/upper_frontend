import { Button } from 'components/lib';
import { FC } from 'react';
import { useSubscribe, useSubscriptionStatus, useUnsubscribe } from 'store/clients/subscription';

export const SubscriptionButton: FC<{ blogId: number; className?: string }> = ({
  blogId,
  className,
}) => {
  const { data: isSubscribed, isLoading } = useSubscriptionStatus(blogId);
  const { mutate: subscribe, isLoading: isBeingSubscribed } = useSubscribe(blogId);
  const { mutate: unsubscribe } = useUnsubscribe(blogId);

  if (isLoading) return <></>;

  if (isSubscribed)
    return (
      <Button className={className} onClick={unsubscribe}>
        Obuna bo&apos;lingan
      </Button>
    );

  return (
    <Button className={className} onClick={subscribe} loading={isBeingSubscribed}>
      Obuna bo&apos;lish
    </Button>
  );
};
