/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com']
  },
  // Enable experimental features for better Netlify compatibility
  experimental: {
    esmExternals: true,
  }
};

module.exports = nextConfig;
