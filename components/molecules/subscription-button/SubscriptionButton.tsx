import { Button } from 'components/lib';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscribe, useSubscriptionStatus } from 'store/clients/subscription';
import { openUnsubscribeModal } from 'store/states';

export const SubscriptionButton: FC<{ blogId: number; className?: string }> = ({
  blogId,
  className,
}) => {
  const { data: isSubscribed, isLoading } = useSubscriptionStatus(blogId);
  const { mutate: subscribe, isPending: isBeingSubscribed } = useSubscribe(blogId);
  const dispatch = useDispatch();

  const unsubscribeHandler = (): unknown => dispatch(openUnsubscribeModal(blogId));

  if (isLoading) return <></>;

  if (isSubscribed)
    return (
      <Button className={className} color='tertiary' onClick={unsubscribeHandler}>
        Obuna bo&apos;lingan
      </Button>
    );

  return (
    <Button className={className} onClick={subscribe} loading={isBeingSubscribed}>
      Obuna bo&apos;lish
    </Button>
  );
};
