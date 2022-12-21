import { Alert, Button, Error, Input, Modal, Textarea } from 'components';
import { useModal } from 'hooks';
import Link from 'next/link';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useChangeDonatCredentialsMutation } from 'store/apis';
import { convertToCardNumbers } from 'utils';

import { INavTab } from '../NavsTabs/NavsTabs.types';

export const SupportTab: FC<INavTab> = ({ currentBlog }) => {
  const [isConfirmationModalOpen, toggleConfirmationModal] = useModal();
  const [changeDonatCredentials, changeDonatCredentialsRes] = useChangeDonatCredentialsMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const turnOnSupport = (): void => {
    const values = getValues();
    changeDonatCredentials({ donatText: values.text, cardNumber: values.card });
  };

  const confirmationModal = useMemo(() => {
    const values = getValues();
    const validatedCardNumer = convertToCardNumbers(values.card);

    return (
      <Modal
        isOpen={isConfirmationModalOpen}
        bodyClassName='text-center'
        close={toggleConfirmationModal}
      >
        <h4>
          {currentBlog?.cardNumber
            ? "Ma'lumotlarni tasdiqlang"
            : "Rag'batlantirish hizmatini yoqish uchun quyidagi ma'lumotlarni tasdiqlang"}
        </h4>
        {Boolean(values.text) && <h4>{values.text}</h4>}
        <p>{validatedCardNumer}</p>
        <Button onClick={toggleConfirmationModal} color='outline-dark'>
          Bekor qilish
        </Button>
        <Button
          onClick={turnOnSupport}
          className='ms-2'
          loading={changeDonatCredentialsRes.isLoading}
        >
          Tasdiqlash
        </Button>
      </Modal>
    );
  }, [isConfirmationModalOpen, changeDonatCredentialsRes.status]);

  const submitHandler = (): void => {
    toggleConfirmationModal();
  };

  useEffect(() => {
    const { isSuccess } = changeDonatCredentialsRes;
    if (isSuccess) {
      toggleConfirmationModal();
    }
  }, [changeDonatCredentialsRes.status]);

  return (
    <div>
      {confirmationModal}
      {currentBlog?.cardNumber && (
        <Alert color='green' className='mb-1'>
          <p className='my-1'>Rag&apos;batlantirish hizmati yoqilgan</p>
        </Alert>
      )}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='form-element'>
          <label htmlFor='donat-text' className='d-block mb-1'>
            Rag&apos;batlantirish matni (ihtiyoriy)
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
            <Link href='/docs/blogging/credit-card'>
              <a target='_blank' className='link'>
                Karta raqam nega kerak?
              </a>
            </Link>
          </div>
          <Input
            type='number'
            {...register('card', {
              required: true,
              minLength: { value: 16, message: 'Karta raqami 16 tadan kam' },
              maxLength: { value: 16, message: "Karta raqami 16 tadan ko'p" },
            })}
            defaultValue={currentBlog?.cardNumber}
            placeholder='0000 0000 0000 0000'
          />
          <Error error={errors.card} />
        </div>
        <Button>
          {currentBlog?.cardNumber
            ? "Ma'lumotlarni o'zgartirish"
            : "Rag'batlantirish imkoniyatini yoqish"}
        </Button>
      </form>
    </div>
  );
};
