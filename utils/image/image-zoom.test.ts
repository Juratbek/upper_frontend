import { vi } from 'vitest';

const bucketUrl = 'https://upper-dev-blog-img-bucket.s3.ap-south-1.amazonaws.com/';
vi.stubEnv('NEXT_PUBLIC_BLOG_BUCKET_URL', bucketUrl);

describe('getImageType', () => {
  it('google images will be zoomable', async () => {
    const { getImageType } = await import('./imageZoom');
    const res = getImageType(`https://googleusercontent.com/u/lawfbkawbfkajw`);
    expect(res).toEqual({
      type: 'google',
      zoomable: false,
    });
  });

  it('upper.uz images will be zoomable', async () => {
    const { getImageType } = await import('./imageZoom');
    const res = getImageType(`${bucketUrl}10/faloiwnflaiw`);
    expect(res).toEqual({
      type: 'upper',
      zoomable: true,
    });
  });

  it('Telegram images will be zoomable', async () => {
    const { getImageType } = await import('./imageZoom');
    const res = getImageType('https://t.me/akjwbf');
    expect(res).toEqual({
      type: 'telegram',
      zoomable: true,
    });
  });

  it('GitHub images will NOT be zoomable', async () => {
    const { getImageType } = await import('./imageZoom');
    const res = getImageType('https://avatars.githubusercontent.com/alnw');
    expect(res).toEqual({
      type: 'github',
      zoomable: false,
    });
  });

  it('GitHub images will NOT be zoomable', async () => {
    const { getImageType } = await import('./imageZoom');
    const res = getImageType('https://somedomain.com/alnw');
    expect(res).toEqual({
      type: 'unknown',
      zoomable: false,
    });
  });
});
