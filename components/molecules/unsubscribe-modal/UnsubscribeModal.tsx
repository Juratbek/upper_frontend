import { Clickable, Modal, Spinner } from 'components/lib';
import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUnsubscribe } from 'store/clients/subscription';
import {
  closeUnsubscribeModal,
  getBlogIdToUnsubscribe,
  getIsUnsubscribeModalOpen,
} from 'store/states';

import classes from './UbsubscribeModal.module.scss';

export const UnsubscribeModal: FC = () => {
  const isOpen = useSelector(getIsUnsubscribeModalOpen);
  const dispatch = useDispatch();
  const blogId = useSelector(getBlogIdToUnsubscribe);
  const { mutate: unsubscribe, isPending: isUnsubscribeLoading } = useUnsubscribe(Number(blogId));

  const closeHandler = useCallback(() => dispatch(closeUnsubscribeModal()), []);

  const unsibscribeHandler = useCallback(() => {
    unsubscribe('');
    closeHandler();
  }, [closeHandler]);

  const footer = useMemo(
    () => (
      <div className='d-flex'>
        <Clickable className={classes['unsubscribe-btn']} onClick={unsibscribeHandler}>
          {isUnsubscribeLoading ? <Spinner /> : 'Bekor qilish'}
        </Clickable>
        <Clickable className={classes['no-btn']} onClick={closeHandler}>
          yo&apos;q
        </Clickable>
      </div>
    ),
    [closeHandler, isUnsubscribeLoading, unsibscribeHandler],
  );

  return (
    <Modal isOpen={isOpen} close={closeHandler} footer={footer}>
      <p className={classes.text}>Obunani bekor qilmoqchimisiz?</p>
    </Modal>
  );
};
