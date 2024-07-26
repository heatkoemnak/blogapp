/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com','lh3.googleusercontent.com','avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'demos.creative-tim.com',
        port: '',
      },
    ],
    
  },
};
export default nextConfig;
