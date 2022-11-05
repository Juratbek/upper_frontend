import { Alert, Avatar, Button, Divider, FileInput, Input, Textarea } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLazyGetCurrentBlogQuery, useUpdateBlogMutation } from 'store/apis';
import { ILink, TIcon, TSubmitFormEvent } from 'types';
import { addAmazonUri, compressImage } from 'utils';
import { ICONS, SOCIAL_MEDIA_ICONS } from 'variables';
import { PROFILE_TAB_IDS } from 'variables/Profile.constants';

import classes from './AboutTab.module.scss';

export const AboutTab: FC = () => {
  const [alert, setAlert] = useState<string>();
  const {
    query: { tab },
  } = useRouter();
  const [fetchCurrentBlog, currentBlogRes] = useLazyGetCurrentBlogQuery();
  const [updateBlog, updateBlogRes] = useUpdateBlogMutation();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (tab && tab === PROFILE_TAB_IDS.settings) {
      fetchCurrentBlog();
    }
  }, [tab]);

  const submitHandler = async (event: TSubmitFormEvent): Promise<void> => {
    const { name, bio, ...values } = event;
    const mediaIconsSet = new Set(SOCIAL_MEDIA_ICONS);
    const socialMediaLinks = Object.keys(values).reduce((res, value) => {
      if (mediaIconsSet.has(value) && values[value]) {
        return [...res, { type: value, link: values[value] }];
      }
      return res;
    }, [] as Array<ILink>);
    const avatar = event.avatar[0] as unknown as File;
    const compressedAvatarImage = await compressImage(avatar);

    const formData = new FormData();
    avatar && formData.set('avatar', compressedAvatarImage);
    formData.set('name', name);
    formData.set('bio', bio);
    formData.set('links', JSON.stringify(socialMediaLinks));

    await updateBlog(formData).unwrap();
  };

  const renderOpenSettings = (): JSX.Element => {
    const { data, isLoading, isFetching, isSuccess, isError, error } = currentBlogRes;
    if (isLoading || isFetching) return <p>Yuklanmoqda...</p>;
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

    if (isSuccess) {
      const blog = addAmazonUri(data);
      return (
        <form className='d-flex flex-wrap' onSubmit={handleSubmit(submitHandler)}>
          <div className='w-100'>
            <h2 className='m-1'>Ochiq ma&apos;lumotlar</h2>
            <Divider />
          </div>
          <div className='w-50 p-1'>
            <div>
              <Avatar imgUrl={blog.imgUrl} className='my-2' size='extra-large' />
              <FileInput {...register('avatar')} />
            </div>
            <div>
              <h4 className='mb-1'>Nomi</h4>
              <Input defaultValue={blog.name} {...register('name', { required: true })} />
            </div>
            <div>
              <h4 className='mb-1'>Bio</h4>
              <Textarea defaultValue={blog.bio} {...register('bio', { required: true })} />
            </div>
          </div>
          <div className='w-50 p-1'>
            <h4 className='mb-1'>Ijtimoiy tarmoqlar</h4>
            <div>
              {SOCIAL_MEDIA_ICONS.map((icon, index) => {
                const Icon = ICONS[icon as TIcon];
                const link = blog.links?.find((link) => link.type === icon)?.link;

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
      );
    }

    return <></>;
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
