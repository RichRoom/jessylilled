/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  images: { 
    unoptimized: true,
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com']
  },
};

module.exports = nextConfig;
