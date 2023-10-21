import { Alert, Button, Error, IAlert, Input, Textarea } from 'components';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateLabelRequestMutation } from 'store/apis';
import { IResponseError } from 'types';

export const CreateLabelForm = (): JSX.Element => {
  const [createLabel, createLabelRes] = useCreateLabelRequestMutation();
  const [alert, setAlert] = useState<IAlert>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (event: Record<string, string>): void => {
    const { name, description } = event;
    createLabel({ name, description });
  };

  useEffect(() => {
    const { isSuccess, isError, error } = createLabelRes;
    if (isError) {
      const exception = error as IResponseError;
      setAlert({ message: exception.data.message || 'Xatolik yuz berdi', color: 'red' });
    }
    if (isSuccess) setAlert({ message: "So'rov jo'natildi", color: 'green' });
  }, [createLabelRes.status]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className='form'>
      {alert && (
        <Alert className='mb-1' color={alert.color}>
          {alert.message}
        </Alert>
      )}
      <div className='mb-1'>
        <label htmlFor='login' className='mb-1 d-block'>
          Nom
        </label>
        <Input {...register('name', { required: 'Tag nomini kiriting' })} />
        <Error error={errors.name} />
      </div>
      <div className='mb-1'>
        <label htmlFor='login' className='mb-1 d-block'>
          Ta&apos;rif
        </label>
        <Textarea {...register('description', { required: "Qisqa ta'rifni kiriting" })} />
        <Error error={errors.description} />
      </div>
      <Button loading={createLabelRes.isLoading} className='w-100'>
        So&apos;rov yuborish
      </Button>
      <p className='text-gray'>
        Tag yaratish uchun so&apos;rov yuboriladi va ko&apos;rib chiqiladi
      </p>
    </form>
  );
};
