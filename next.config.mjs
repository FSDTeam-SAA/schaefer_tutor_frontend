/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "files.edgestore.dev",
        protocol: "https"
      },
      {
        hostname: "api.qrserver.com",
        protocol: "https"
      }
    ],
  },
};

export default nextConfig;
