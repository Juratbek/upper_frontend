import type { Meta, StoryObj } from '@storybook/react';

import { PublishedArticle } from './PublishedArticle';
import { IPublishedArticleProps } from './PublishedArticle.types';

const meta = {
  title: 'components/molecules/Published Article',
  component: (props): JSX.Element => (
    <div style={{ width: 720, margin: 100 }}>
      <PublishedArticle {...props} />
    </div>
  ),
} satisfies Meta<typeof PublishedArticle>;

export default meta;

type TStory = StoryObj<typeof meta>;

const mock: IPublishedArticleProps = {
  article: {
    author: {
      id: 1,
      name: 'Kimdir',
      imgUrl:
        'https://upper-prod-blog-img-bucket.s3.ap-south-1.amazonaws.com/1/21a46cc7-cb3b-4c88-82da-dbf3f29ae85d',
    },
    content:
      "maqolada nima haqida yozilgani haqida qisqacha kontent. Bu matn ikki qatordan oshib ketmasligi kerak. Ikki qatordan oshsa oshib qolgan qismini o'rniga ... qo'yilishi kerak. Buni test qilish uchun uzun matn kitirish kerak. Hozir bu ishlamayabdi, demak stillash kerak Bu matn ikki qatordan oshib ketmasligi kerak. Ikki qatordan oshsa oshib qolgan qismini o'rniga ... qo'yilishi kerak. Buni test qilish uchun uzun matn kitirish kerak. Hozir bu ishlamayabdi, demak stillash kerak",
    id: 12,
    imgUrl: '',
    title:
      "Bilmadim, nimadir deb yozilganda Bu matn ikki qatordan oshib ketmasligi kerak. Ikki qatordan oshsa oshib qolgan qismini o'rniga ... qo'yilishi kerak. Buni test qilish uchun uzun matn kitirish kerak. Hozir bu ishlamayabdi, demak stillash kerak",
  },
};

export const Default: TStory = {
  args: mock,
};
