import { Article, Button, ISelectOption, Select } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'store';
import {
  IChangeTutorialSelectedArticleDto,
  useChangeTutorialSelectedArticleMutation,
  useLazyGetMediumArticleByIdQuery,
  useLazySearchArticleQuery,
} from 'store/apis';
import { getTutorialSections } from 'store/states';
import { IArticleResult } from 'types';
import { addAmazonBucketUriToArticle, convertToOptions } from 'utils';

export const TutorialPage: FC = () => {
  const sections = useAppSelector(getTutorialSections);
  const [selectedArticle, setSelectedArticle] = useState<IArticleResult>();
  const [searchArticle, searchArticleRes] = useLazySearchArticleQuery();
  const [fetchMediumArticleById] = useLazyGetMediumArticleByIdQuery();
  const [changeSelectedArticle, changeSelectedArticleRes] =
    useChangeTutorialSelectedArticleMutation();
  const {
    query: { articleId, sectionId, id },
  } = useRouter();

  const currentTutorialArticle = useMemo(() => {
    if (sectionId && articleId) {
      const section = sections.find((section) => section.id === sectionId);
      return section?.articles.find((article) => article.id === articleId);
    }
  }, [articleId, sectionId, sections]);

  useEffect(() => {
    if (currentTutorialArticle?.articleId) {
      fetchMediumArticleById(currentTutorialArticle.articleId).then((res) =>
        setSelectedArticle(res.data),
      );
    }
  }, [currentTutorialArticle?.articleId]);

  useEffect(() => {
    return () => {
      setSelectedArticle(undefined);
    };
  }, [articleId]);

  const searchArticles = (value: string): void => {
    if (value?.length > 1) {
      searchArticle({ search: value });
    }
  };

  const selectArticleHandler = (option: ISelectOption): void => {
    const article = searchArticleRes.data?.find((article) => article.id === option.value);
    setSelectedArticle(article);
  };

  const confirmArticleSelection = (): void => {
    if (!(sectionId && articleId && id && selectedArticle?.id)) return;

    const dto: IChangeTutorialSelectedArticleDto = {
      sectionId: sectionId as string,
      articleId: articleId as string,
      tutorialId: +id,
      selectedArticleId: selectedArticle?.id,
    };
    changeSelectedArticle(dto);
  };

  if (!currentTutorialArticle) {
    return <div>tanlanmagan</div>;
  }

  return (
    <div className='container mt-3'>
      <div className='d-flex align-items-center justify-content-between'>
        <h3>Biriktirish uchun maqola tanlang</h3>
        {selectedArticle && (
          <Button
            disabled={selectedArticle.id === currentTutorialArticle.articleId}
            onClick={confirmArticleSelection}
            loading={changeSelectedArticleRes.isLoading}
          >
            Tasdiqlash
          </Button>
        )}
      </div>
      <Select
        searcheable
        placeholder='Qidirish uchun yozing'
        onChange={selectArticleHandler}
        onInputDebounce={searchArticles}
        options={convertToOptions(searchArticleRes.data, 'id', 'title')}
        // options={[
        //   { label: 'Test', value: 1 },
        //   { label: 'akl', value: 2 },
        //   { label: 'a09s', value: 3 },
        //   { label: 'fw2s', value: 4 },
        //   { label: '2a2', value: 5 },
        //   { label: 'test123', value: 6 },
        //   { label: '2k', value: 7 },
        //   { label: 'alw8', value: 8 },
        //   { label: '1029', value: 9 },
        // ]}
        // loading={searchArticleRes.isLoading}
        className='mb-2'
      />
      {selectedArticle && (
        <Article
          redirectUrl='/user/articles'
          className='p-2'
          article={addAmazonBucketUriToArticle(selectedArticle)}
        />
      )}
    </div>
  );
};
