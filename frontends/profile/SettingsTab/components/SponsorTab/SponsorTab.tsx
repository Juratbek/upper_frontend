import { Alert, Button, Error, Input, Modal, Textarea } from 'components';
import { useModal } from 'hooks';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChangeDonatCredentialsMutation } from 'store/apis';
import { convertToCardNumbers } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import { INavTab } from '../NavsTabs/NavsTabs.types';

export const SponsorTab: FC<INavTab> = ({ currentBlog }) => {
  const [isConfirmationModalOpen, toggleConfirmationModal, { close: closeConfirmationModal }] =
    useModal();
  const [isTurnOffModalOpen, toggleTurnOffModal] = useModal();
  const [changeDonatCredentials, changeDonatCredentialsRes] = useChangeDonatCredentialsMutation();
  const [cardNumber, setCardNumber] = useState(currentBlog?.cardNumber);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const turnOnSponsor = (): void => {
    const values = getValues();
    changeDonatCredentials({ donatText: values.text, cardNumber: values.card }).then(() => {
      setCardNumber(values.card);
      toggleConfirmationModal();
    });
  };

  const turnOffSponsor = (): void => {
    changeDonatCredentials(null).then((): void => {
      setCardNumber(undefined);
      toggleTurnOffModal();
      reset();
    });
  };

  const confirmationModal = useMemo(() => {
    const values = getValues();
    const validatedCardNumer = convertToCardNumbers(values.card);

    return (
      <Modal
        isOpen={isConfirmationModalOpen}
        bodyClassName='text-center'
        close={closeConfirmationModal}
      >
        <h4>
          {cardNumber
            ? "Ma'lumotlarni tasdiqlang"
            : '"Hissa qo\'shish" hizmatini yoqish uchun quyidagi ma\'lumotlarni tasdiqlang'}
        </h4>
        {Boolean(values.text) && <h4>{values.text}</h4>}
        <p>{validatedCardNumer}</p>
        <Button onClick={toggleConfirmationModal} color='outline-dark'>
          Bekor qilish
        </Button>
        <Button
          onClick={turnOnSponsor}
          className='ms-2'
          loading={changeDonatCredentialsRes.isLoading}
        >
          Tasdiqlash
        </Button>
      </Modal>
    );
  }, [isConfirmationModalOpen, changeDonatCredentialsRes.status]);

  const turnOffModal = useMemo(
    () => (
      <Modal isOpen={isTurnOffModalOpen} bodyClassName='text-center' close={toggleTurnOffModal}>
        <h4>&quot;Hissa qo&apos;shish&quot; hizmatini o&apos;chirmoqchimisiz</h4>
        <Button onClick={toggleTurnOffModal} color='outline-dark'>
          Bekor qilish
        </Button>
        <Button
          onClick={turnOffSponsor}
          className='ms-2'
          color='outline-red'
          loading={changeDonatCredentialsRes.isLoading}
        >
          Hizmarni o&apos;chirish
        </Button>
      </Modal>
    ),
    [isTurnOffModalOpen, changeDonatCredentialsRes.status],
  );

  const submitHandler = (): void => {
    toggleConfirmationModal();
  };

  return (
    <div>
      {confirmationModal}
      {turnOffModal}
      {cardNumber && (
        <Alert color='green' className='mb-1'>
          <p className='my-1'>&quot;Hissa qo&apos;shish&quot; hizmati yoqilgan</p>
        </Alert>
      )}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='form-element'>
          <label htmlFor='donat-text' className='d-block mb-1'>
            Hissa qo&apos;shish matni (ixtiyoriy)
          </label>
          <Textarea
            defaultValue={currentBlog?.donatText}
            {...register('text', { maxLength: 100 })}
          />
          <Error error={errors.text} />
        </div>
        <div className='form-element'>
          <div className='mb-1 d-flex justify-content-between'>
            <label htmlFor='credit-card'>Plastik karta raqami</label>
            <Link
              href={`${WEB_APP_ROOT_DIR}/docs/blogging_settings_sponsor`}
              target='_blank'
              className='link'
            >
              Karta raqam nega kerak?
            </Link>
          </div>
          <Input
            type='number'
            {...register('card', {
              required: true,
              minLength: { value: 16, message: 'Karta raqami 16 tadan kam' },
              maxLength: { value: 16, message: "Karta raqami 16 tadan ko'p" },
            })}
            defaultValue={cardNumber}
            placeholder='0000 0000 0000 0000'
          />
          <Error error={errors.card} />
        </div>
        <div className='d-flex'>
          <Button color={cardNumber ? 'outline-dark' : 'dark'}>
            {cardNumber ? "Ma'lumotlarni o'zgartirish" : '"Hissa qo\'shish" hizmatini yoqish'}
          </Button>
          {Boolean(cardNumber) && (
            <Button onClick={toggleTurnOffModal} type='button' color='outline-red' className='ms-1'>
              Hizmatni o&apos;chirish
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
