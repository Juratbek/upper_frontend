import { IBlockData } from 'components/organisms';
import { IImageData } from 'components/organisms/editor/tools/image';
import { ARTICLE_BUCKET_URL, PUBLISHED_ARTICLE_BUCKET_URL } from 'store/apis';
import { IPublishedArticleItem } from 'types';

export const addAmazonBucketUrl = <T extends IPublishedArticleItem>(article: T): T => {
  const imgUrl = article.imgUrl;
  if (!imgUrl || imgUrl === 'null' || imgUrl.startsWith('http')) return article;
  return { ...article, imgUrl: `${ARTICLE_BUCKET_URL}${imgUrl}` };
};

export function addBucketUrlToBlocks(blocks: IBlockData[]) {
  return blocks.map((block) => {
    if (block.type === 'image') {
      const { data } = block;
      return {
        ...block,
        data: {
          ...data,
          file: { ...data.file, url: `${PUBLISHED_ARTICLE_BUCKET_URL}${data.file.url}` },
        },
      } as IBlockData<IImageData>;
    }

    return block;
  });
}
