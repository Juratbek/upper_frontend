const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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

module.exports = withBundleAnalyzer(nextConfig);
