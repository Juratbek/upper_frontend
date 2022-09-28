import { Avatar, Button, Divider, FileInput, Input, Textarea } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLazyGetCurrentBlogQuery, useUpdateBlogMutation } from 'store/apis';
import { ILink, TSubmitFormEvent } from 'types';
import { ICONS, SOCIAL_MEDIA_ICONS } from 'variables';
import { PROFILE_TAB_IDS } from 'variables/Profile.constants';

import classes from './SettingsTab.module.scss';

export const SettingsTab: FC = () => {
  const {
    query: { tab },
  } = useRouter();
  const [fetchCurrentBlog, currentBlogRes] = useLazyGetCurrentBlogQuery();
  const [updateBlog] = useUpdateBlogMutation();
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
    const avatar = event.avatar[0];
    const formData = new FormData();
    avatar && formData.set('avatar', avatar);
    formData.set('name', name);
    formData.set('bio', bio);
    formData.set('links', JSON.stringify(socialMediaLinks));
    await updateBlog(formData).unwrap();
  };

  const renderSettings = (): JSX.Element => {
    const { data: blog, isLoading, isFetching, isSuccess, isError, error } = currentBlogRes;
    if (isLoading || isFetching) return <p>Yuklanmoqda...</p>;
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

    if (isSuccess)
      return (
        <form className='d-flex flex-wrap' onSubmit={handleSubmit(submitHandler)}>
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
                const Icon = ICONS[icon];
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
            <Button>Saqlash</Button>
          </div>
        </form>
      );

    return <></>;
  };

  return (
    <div className='px-2'>
      <h2>Blogingiz haqida</h2>
      <Divider />
      {renderSettings()}
    </div>
  );
};
