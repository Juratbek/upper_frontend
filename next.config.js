/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      't.me',
      'upper-dev-article-img-bucket.s3.ap-south-1.amazonaws.com',
      'upper-dev-blog-img-bucket.s3.ap-south-1.amazonaws.com',
      'upper-dev-tutorial-img-bucket.s3.ap-south-1.amazonaws.com',
      'upper-prod-article-img-bucket.s3.ap-south-1.amazonaws.com',
      'upper-prod-blog-img-bucket.s3.ap-south-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
