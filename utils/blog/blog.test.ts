import { IBlog } from 'types';

import { convertBlogToHeadProp } from './blog';

const blog: IBlog = {
  createdDate: new Date().toString(),
  id: 12,
  imgUrl: 'some_image',
  labels: [],
  links: [],
  name: 'Aziz',
  bio: 'Some bio',
};

describe('convertBlogToHeadProp', () => {
  it('converts blog into head component prop', () => {
    const res = convertBlogToHeadProp(blog);
    expect(res.title).toEqual(blog.name);
    expect(res.imgUrl).toEqual(blog.imgUrl);
    expect(res.description).toEqual(blog.bio);
  });
});
