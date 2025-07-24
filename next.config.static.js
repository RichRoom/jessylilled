/** @type {import('next').NextConfig} */
// Alternative configuration for static export
// Use this if you prefer static hosting without server-side features
const nextConfigStatic = {
  output: 'export',
  trailingSlash: true, // Important for static hosting
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com']
  },
  // Disable features that don't work with static export
  experimental: {
    appDir: true,
  }
};

module.exports = nextConfigStatic;
