/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 't.me' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'upper-dev-article-img-bucket.s3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: 'upper-dev-blog-img-bucket.s3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: 'upper-dev-tutorial-img-bucket.s3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: 'upper-prod-article-img-bucket.s3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: 'upper-prod-blog-img-bucket.s3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: 'media.licdn.com' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
