import {
  Alert,
  ApiErrorBoundary,
  Avatar,
  Button,
  Divider,
  FileInput,
  Input,
  Textarea,
} from 'components';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateBlogMutation } from 'store/apis';
import { ILink, TIcon, TSubmitFormEvent } from 'types';
import { addAmazonUri, compressImage, toBase64 } from 'utils';
import { ICONS, SOCIAL_MEDIA_ICONS } from 'variables';

import { INavTab } from '../NavsTabs/NavsTabs.types';
import classes from './AboutTab.module.scss';

export const AboutTab: FC<INavTab> = ({ currentBlog, res = {} }) => {
  const [alert, setAlert] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string | undefined>(currentBlog?.imgUrl);
  const [updateBlog, updateBlogRes] = useUpdateBlogMutation();
  const { register, handleSubmit, watch } = useForm();

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
    const { name, bio, ...values } = event;
    const mediaIconsSet = new Set(SOCIAL_MEDIA_ICONS);
    const socialMediaLinks = Object.keys(values).reduce((res, value) => {
      if (mediaIconsSet.has(value) && values[value]) {
        return [...res, { type: value as TIcon, link: values[value] }];
      }
      return res;
    }, [] as Array<ILink>);
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
    formData.set('links', JSON.stringify(socialMediaLinks));

    updateBlog(formData);
  };

  const renderOpenSettings = (): JSX.Element => {
    return (
      <ApiErrorBoundary res={{ ...res, imgUrl, updating: updateBlogRes.isLoading }}>
        <form className={`d-flex flex-wrap ${classes.form}`} onSubmit={handleSubmit(submitHandler)}>
          <div className='w-100'>
            <h2 className='m-1'>Ochiq ma&apos;lumotlar</h2>
            <Divider />
          </div>
          <div className='w-50 w-mobile-100 p-1'>
            <div>
              <Avatar imgUrl={imgUrl || ''} className='my-2' size='extra-large' />
              <FileInput {...register('avatar')} accept='image/jpeg, image/png' />
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
                    message: 'Bio o`ta uzun',
                  },
                })}
              />
            </div>
          </div>
          <div className='w-50 w-mobile-100 p-1'>
            <h4 className='mb-1'>Ijtimoiy tarmoqlar</h4>
            <div>
              {SOCIAL_MEDIA_ICONS.map((icon, index) => {
                const Icon = ICONS[icon as TIcon];
                const link = currentBlog?.links?.find((link) => link.type === icon)?.link;

                return (
                  <div key={index} className='d-flex my-2 w-100 align-items-center'>
                    <span className={classes['media-icon']}>
                      <Icon />
                    </span>
                    <span className='flex-auto'>
                      <Input defaultValue={link} {...register(icon, { minLength: 5 })} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='px-1'>
            <Button loading={updateBlogRes.isLoading}>Saqlash</Button>
          </div>
        </form>
      </ApiErrorBoundary>
    );
  };

  return (
    <>
      {alert && (
        <Alert color='green' onClose={(): void => setAlert('')}>
          {alert}
        </Alert>
      )}
      {renderOpenSettings()}
    </>
  );
};
