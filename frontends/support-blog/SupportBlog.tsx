import { ApiErrorBoundary } from 'components';
import { Button } from 'components/lib';
import { useClipboard } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazyGetBlogDonatCredentialsQuery } from 'store/apis';
import { convertToCardNumbers } from 'utils';

export const SupportBlog: FC = () => {
  const [getDonatCredentials, getDonatCredentialsRes] = useLazyGetBlogDonatCredentialsQuery();
  const { writeText, isLoading, isCopied } = useClipboard();
  const {
    query: { id },
  } = useRouter();
  const { data } = getDonatCredentialsRes;

  const copyCardNumber = (): void => {
    writeText(data?.cardNumber || 'Nushalashda xatolik yuz berdi');
  };

  useEffect(() => {
    id && getDonatCredentials(+id);
  }, [id]);

  return (
    <ApiErrorBoundary
      memoizationDependencies={[isCopied, isLoading]}
      res={getDonatCredentialsRes}
      className='container form form--medium'
    >
      <h3 className='mt-1'>Blog faoliyatiga o&apos;z hissangizni qo&apos;shing</h3>
      {Boolean(data?.donatText) && <p>{data?.donatText}</p>}
      <h4>{convertToCardNumbers(data?.cardNumber)}</h4>
      <Button loading={isLoading} onClick={copyCardNumber}>
        {isCopied ? 'Nushalandi' : 'Karta raqamidan nusha olish'}
      </Button>
    </ApiErrorBoundary>
  );
};
