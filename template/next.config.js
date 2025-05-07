/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    viewTransition: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
