import {
  Alert,
  ArticleImg,
  Button,
  Error,
  FileDragDrop,
  IOption,
  Modal,
  MultiSelect,
} from 'components';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazySearchLabelsQuery, usePublishTutorialMutation } from 'store/apis';
import { getIsPublishTutorialModalOpen, publishTutorialModalHandler } from 'store/states';
import { ILabel, IResponseError } from 'types';
import { compressImage, convertLabelsToOptions, toBase64 } from 'utils';
import { MAX_LABELS } from 'variables';

export const PublishTutorialModal: FC = () => {
  const [selectedImageBase64, setSelectedImageBase64] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [searchLabels, searchLabelsRes] = useLazySearchLabelsQuery();
  const [publish, publishRes] = usePublishTutorialMutation();
  const isOpen = useAppSelector(getIsPublishTutorialModalOpen);
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { query } = useRouter();

  const close = (): unknown => dispatch(publishTutorialModalHandler({ isOpen: false }));

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
    if (!selectedImage) return;
    const labels: ILabel[] = (event.labels as IOption[]).map<ILabel>((l) => ({
      name: l.label,
      id: +l.value,
    }));

    const formData = new FormData();
    formData.set('image', selectedImage);
    formData.set('labels', JSON.stringify(labels));
    formData.set('tutorialId', query.id as string);
    publish(formData);
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      {publishRes.isError && (
        <Alert className='mb-1' color='red'>
          {(publishRes.error as IResponseError).data.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit(submitHandler)}>
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
                max={MAX_LABELS}
                onInputDebounce={SearchLabels}
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
          {/* <Controller
            name='image'
            rules={{ required: 'Rasmni tanlang' }}
            control={control}
            render={({ field }): JSX.Element => (
              <FileDragDrop
                {...field}
                selectedFileRenderer={(): JSX.Element =>
                  selectedImageBase64 ? <ArticleImg imgUrl={selectedImageBase64} /> : <></>
                }
                onChange={fileChangeHandler}
              />
            )}
          /> */}
          <FileDragDrop
            {...register('image', { required: 'Rasmni tanlang' })}
            selectedFileRenderer={(): JSX.Element =>
              selectedImageBase64 ? <ArticleImg imgUrl={selectedImageBase64} /> : <></>
            }
            onChange={fileChangeHandler}
          />
          <Error error={errors.image} />
        </div>
        <div className='d-flex justify-content-end'>
          <Button type='button' color='outline-dark' className='me-1'>
            Bekor qilish
          </Button>
          <Button className='w-30'>Nashr qilish</Button>
        </div>
      </form>
    </Modal>
  );
};
