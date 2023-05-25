/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      }, {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;
