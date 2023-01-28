import { Article, Button, ISelectOption, Select } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  IChangeTutorialSelectedArticleDto,
  useChangeTutorialSelectedArticleMutation,
  useLazyGetMediumPublishedArticleByIdQuery,
  useLazySearchCurrentBlogPublishedArticlesQuery,
} from 'store/apis';
import { changeTutorialArticle, getTutorialSections } from 'store/states';
import { IArticleResult } from 'types';
import { addAmazonBucketUriToArticle, convertToOptions } from 'utils';
import { PUBLISHED_ARTICLE_STATUSES } from 'variables';

export const TutorialPage: FC = () => {
  const sections = useAppSelector(getTutorialSections);
  const [selectedArticle, setSelectedArticle] = useState<IArticleResult>();
  const [searchArticle, searchArticleRes] = useLazySearchCurrentBlogPublishedArticlesQuery();
  const [fetchMediumArticleById] = useLazyGetMediumPublishedArticleByIdQuery();
  const dispatch = useAppDispatch();
  const [changeSelectedArticle, changeSelectedArticleRes] =
    useChangeTutorialSelectedArticleMutation();
  const {
    query: { articleId, sectionId, id },
  } = useRouter();

  const { currentTutorialArticle, currentSection } = useMemo(() => {
    if (sectionId && articleId) {
      const section = sections.find((section) => section.id === sectionId);
      const article = section?.articles.find((article) => article.id === articleId);
      return {
        currentSection: section,
        currentTutorialArticle: article,
      };
    }
    return {};
  }, [articleId, sectionId, sections]);

  const hasArticle = useMemo(() => {
    return sections.some((section) => section.articles.length > 0);
  }, [sections]);

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
      searchArticle({ search: value, statuses: PUBLISHED_ARTICLE_STATUSES.ACTIVE });
    }
  };

  const selectArticleHandler = (option: ISelectOption): void => {
    const article = searchArticleRes.data?.find((article) => article.id === option.value);
    setSelectedArticle(article);
  };

  const confirmArticleSelection = async (): Promise<void> => {
    if (!(id && selectedArticle?.id && currentSection && currentTutorialArticle)) return;

    const dto: IChangeTutorialSelectedArticleDto = {
      sectionId: sectionId as string,
      articleId: articleId as string,
      tutorialId: +id,
      selectedArticleId: selectedArticle.id,
    };
    await changeSelectedArticle(dto).unwrap();
    dispatch(
      changeTutorialArticle({
        section: currentSection,
        article: { ...currentTutorialArticle, articleId: selectedArticle.id },
      }),
    );
  };

  if (!currentTutorialArticle) {
    return (
      <h3 className='text-center'>
        {hasArticle
          ? "O'ng tarafdan maqolani tanlang"
          : "Tanlash uchun o'ng tarafda maqola yarating"}
      </h3>
    );
  }

  return (
    <div className='container mt-3'>
      <div className='d-flex align-items-center justify-content-between'>
        <div>
          <h2 className='mb-0'>Biriktirish uchun maqola tanlang</h2>
          <p className='my-1 text-gray'>Maqolangiz nashr qilingan bo&apos;lishi kerak</p>
        </div>
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
