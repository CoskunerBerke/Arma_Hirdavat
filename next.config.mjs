/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'armahirdavat.com.tr',
      },
      {
        protocol: 'http',
        hostname: 'armahirdavat.com.tr',
      },
    ],
  },
};

export default nextConfig;
