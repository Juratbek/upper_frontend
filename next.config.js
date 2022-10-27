/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'www.lamborghini.com',
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'i.natgeofe.com',
    ],
  },
};

module.exports = nextConfig;
