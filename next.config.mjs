/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com','deep-image.ai','getillustrations.b-cdn.net','lh3.googleusercontent.com','avatars.githubusercontent.com','res.cloudinary.com','flowbite.com'],
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
