/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'pagedone.io',
      'deep-image.ai',
      'getillustrations.b-cdn.net',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
      'flowbite.com',
      'img.buymeacoffee.com'
    ],
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
