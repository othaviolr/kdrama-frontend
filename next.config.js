/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://72.60.144.4:8080/api/:path*',
           //destination: 'http://localhost:5120/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;