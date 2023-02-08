import {
  Alert,
  ArticleImg,
  Button,
  Error,
  FileDragDrop,
  IOption,
  Lordicon,
  Modal,
  MultiSelect,
} from 'components';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazySearchLabelsQuery, usePublishTutorialMutation } from 'store/apis';
import {
  getIsPublishTutorialModalOpen,
  getTutorialImgUrl,
  getTutorialLabels,
  publishTutorialModalHandler,
} from 'store/states';
import { ILabel, IResponseError } from 'types';
import { addTutorialAmazonUri, compressImage, convertLabelsToOptions, toBase64 } from 'utils';
import { TUTORIAL_MAX_LABELS } from 'variables';

import classes from './PublishTutorialModal.module.scss';

interface IErrorResponse {
  error: IResponseError;
}

export const PublishTutorialModal: FC = () => {
  const [selectedImageBase64, setSelectedImageBase64] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [searchLabels, searchLabelsRes] = useLazySearchLabelsQuery();
  const [publish, publishRes] = usePublishTutorialMutation();
  const isOpen = useAppSelector(getIsPublishTutorialModalOpen);
  const dispatch = useAppDispatch();
  const [isPublishError, setIsPublishError] = useState<boolean>(publishRes.isError);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { query } = useRouter();
  const imgUrl = useAppSelector(getTutorialImgUrl);
  const labels = useAppSelector(getTutorialLabels);

  const close = (): void => {
    dispatch(publishTutorialModalHandler({ isOpen: false }));
    setIsPublishError(false);
  };

  const SearchLabels = (value: string): void => {
    value && searchLabels(value);
  };

  const fileChangeHandler = async (file: File): Promise<void> => {
    const compressedImage = await compressImage(file);
    setSelectedImage(compressedImage);

    const imgUrl = await toBase64(compressedImage);
    imgUrl && setSelectedImageBase64(imgUrl.toString());
  };

  const submitHandler = (event: Record<string, unknown>): void => {
    if (!selectedImage && !imgUrl) return;
    const labels: ILabel[] = (event.labels as IOption[]).map<ILabel>((l) => ({
      name: l.label,
      id: +l.value,
    }));

    const formData = new FormData();
    if (selectedImage) {
      formData.set('image', selectedImage);
    }
    formData.set('labels', JSON.stringify(labels));
    formData.set('tutorialId', query.id as string);
    publish(formData)
      .unwrap()
      .catch(() => setIsPublishError(true));
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      {isPublishError && (
        <Alert className='mb-1' color='red'>
          {(publishRes.error as IResponseError).data.message}
        </Alert>
      )}
      {publishRes.isSuccess ? (
        <div className='text-center'>
          <Lordicon
            className={classes.congrats}
            width={100}
            height={100}
            src='/icons/congrats.webp'
          />
          <h3>Maqolangiz nashr qilindi</h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submitHandler, console.error)}>
          <h3 className='mt-0'>To&apos;plamni nashr qilish uchun quidagilarni kiriting</h3>
          <div className='form-element'>
            <label className='form-label'>Teglarni tanlang</label>
            <Controller
              name='labels'
              control={control}
              rules={{ required: 'Teglarni tanlang' }}
              render={({ field }): JSX.Element => (
                <MultiSelect
                  {...field}
                  max={TUTORIAL_MAX_LABELS}
                  onInputDebounce={SearchLabels}
                  defaultValues={convertLabelsToOptions(labels)}
                  renderItem={(item): JSX.Element => {
                    return (
                      <div className='p-1 pointer'>
                        <h4 className='m-0'>{item.label}</h4>
                        <p className='m-0 mt-1 fs-1'>{item.description}</p>
                      </div>
                    );
                  }}
                  loading={searchLabelsRes.isLoading}
                  options={convertLabelsToOptions(searchLabelsRes.data)}
                  inputPlacegolder='Qidirish uchun yozing'
                />
              )}
            />
            <Error error={errors.labels} />
          </div>
          <div className='form-element'>
            <label htmlFor='file' className='form-label'>
              Rasm tanlang
            </label>
            <FileDragDrop
              {...register('image', { required: imgUrl ? false : 'Rasmni tanlang' })}
              selectedFileRenderer={(): JSX.Element => {
                if (selectedImageBase64) return <ArticleImg imgUrl={selectedImageBase64} />;
                if (imgUrl) return <ArticleImg imgUrl={addTutorialAmazonUri({ imgUrl }).imgUrl} />;
                return <></>;
              }}
              onChange={fileChangeHandler}
              defaultValue={imgUrl}
            />
            <Error error={errors.image} />
          </div>
          <div className='d-flex justify-content-end'>
            <Button type='button' onClick={close} color='outline-dark' className='me-1'>
              Bekor qilish
            </Button>
            <Button className='w-30' loading={publishRes.isLoading}>
              Nashr qilish
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
