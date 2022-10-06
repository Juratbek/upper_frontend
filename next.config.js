const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['www.lamborghini.com', 'images.unsplash.com'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
