/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'www.lamborghini.com',
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'i.natgeofe.com',
      't.me',
      'upper-article-image-assets-bucket.s3.ap-south-1.amazonaws.com',
      'upper-blog-image-assets-bucket.s3.ap-south-1.amazonaws.com'
    ],
  },
};

module.exports = nextConfig;
