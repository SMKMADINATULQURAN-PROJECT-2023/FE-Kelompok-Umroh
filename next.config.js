/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.astronauts.id',
        port: '',
        pathname: '/blog/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'static.republika.co.id',
        port: '',
        pathname: '/uploads/images/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
