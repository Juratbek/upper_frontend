import { Button, Error, Input, Textarea } from 'components';
import { useForm } from 'react-hook-form';

export const CreateLabelForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (event: Record<string, string>): Promise<void> => {
    console.log('🚀 ~ file: CreateLabelForm.tsx:7 ~ submitHandler ~ event', event);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className='form'>
      <div className='mb-1'>
        <label htmlFor='login' className='mb-1 d-block'>
          Nomi
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
      <Button className='w-100'>So`rov yuborish</Button>
      <p className='text-gray'>Tag yaratish uchun so`riv yuboriladi va ko`rib chiqiladi</p>
    </form>
  );
};
