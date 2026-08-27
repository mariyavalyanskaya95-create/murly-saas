/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'web-production-81be0.up.railway.app' },
      { protocol: 'https', hostname: '**.railway.app' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'https://web-production-81be0.up.railway.app/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
