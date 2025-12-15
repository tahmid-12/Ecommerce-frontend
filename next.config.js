/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "localhost:9000",
        protocol: "http",
      },
    ],
  },
  
};

module.exports = nextConfig;
