/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // Enable experimental features for better Netlify compatibility
  experimental: {
    esmExternals: true,
  },
  // Exclude Supabase functions from Next.js build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'supabase/functions': 'commonjs supabase/functions'
      });
    }
    return config;
  },
};

module.exports = nextConfig;
