import { FileInput, Input, Textarea } from 'components/form';
import { Alert, Avatar, Button, Error } from 'components/lib';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetCurrentBlog, useUpdateBlog } from 'store/clients/blog';
import { TSubmitFormEvent } from 'types';
import { addAmazonUri, compressImage, toBase64 } from 'utils';

import classes from './ProfileSettings.module.scss';

export const ProfileSettingsUI: FC = () => {
  const { data: currentBlog } = useGetCurrentBlog();
  const [alert, setAlert] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string | undefined>(currentBlog?.imgUrl);
  const { mutate: updateBlog, isPending: isBeingUpdated } = useUpdateBlog();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log('🚀 ~ imgUrl:', imgUrl);

  useEffect(() => {
    if (currentBlog) {
      const imgUrl = addAmazonUri(currentBlog).imgUrl;
      setImgUrl(imgUrl);
    }
  }, [currentBlog]);

  useEffect(() => {
    const avatarFile = watch('avatar')?.[0];
    if (typeof avatarFile !== 'object') return;
    avatarChangeHandler(avatarFile);
  }, [watch('avatar')]);

  const avatarChangeHandler = async (file: File): Promise<void> => {
    const imageDataStr = await toBase64(file);
    setImgUrl(imageDataStr as string);
  };

  const submitHandler = async (event: TSubmitFormEvent): Promise<void> => {
    const { name, bio } = event;
    const avatar = event.avatar[0] as unknown as File;

    const formData = new FormData();
    const isAvatarChanged = !imgUrl?.includes(currentBlog?.imgUrl as string);
    if (avatar && isAvatarChanged) {
      const compressedAvatarImage = await compressImage(avatar);
      const mediumCompressedImage = await compressImage(avatar, { medium: true });
      formData.set('avatar', compressedAvatarImage);
      formData.set('avatarWithMediumQuality', mediumCompressedImage);
    }
    formData.set('name', name);
    formData.set('bio', bio);

    updateBlog(formData);
  };

  return (
    <>
      {alert && (
        <Alert color='green' onClose={(): void => setAlert('')}>
          {alert}
        </Alert>
      )}
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <div>
          <Avatar imgUrl={imgUrl ?? ''} className='my-2' size='extra-large' test='Setting' />
          <FileInput
            {...register('avatar', {
              validate: {
                lessThan5MB: (files) => {
                  if (files[0]?.size / 2 ** 20 >= 5) return 'Rasm hajmi 5 MB dan katta';
                },
              },
            })}
            accept='image/jpeg, image/png'
          />
          <Error error={errors['avatar']} />
        </div>
        <div>
          <h4 className='mb-1'>Nomi</h4>
          <Input defaultValue={currentBlog?.name} {...register('name', { required: true })} />
        </div>
        <div>
          <h4 className='mb-1'>Bio</h4>
          <Textarea
            defaultValue={currentBlog?.bio}
            {...register('bio', {
              maxLength: {
                value: 80,
                message: "Bio o'ta uzun",
              },
            })}
          />
        </div>
        <Button className='mt-1' loading={isBeingUpdated}>
          Saqlash
        </Button>
      </form>
    </>
  );
};
