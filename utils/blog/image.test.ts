import { vi } from 'vitest';

const bucketUrl = 'some_bucket_url';

vi.stubEnv('NEXT_PUBLIC_BLOG_BUCKET_URL', bucketUrl);

describe('addBlogAmazonUrl', () => {
  it('returns url with bucket prefix', async () => {
    const { addBlogAmazonUrl } = await import('./image');
    const imgUrl = 'https://upper.uz/10/nimadir';
    const url = addBlogAmazonUrl(imgUrl);
    expect(url).toEqual(bucketUrl + imgUrl);
  });

  it('returns url with bucket prefix for blog img url', async () => {
    const { addBlogAmazonUrl } = await import('./image');
    const imgUrl = 'https://upper.uz/10/nimadir';
    const res = addBlogAmazonUrl<{ imgUrl: string }>({ imgUrl });
    expect(res.imgUrl).toEqual(bucketUrl + imgUrl);
  });

  it('throws an error if imgUrl is not provided', async () => {
    const { addBlogAmazonUrl } = await import('./image');
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      addBlogAmazonUrl<{ imgUrl: string }>({ name: 'blog name' });
    } catch (e) {
      expect((e as { message: string }).message).toEqual(
        'Unsupported data type. Data should be string or object with imageUrl property',
      );
    }
  });
});
