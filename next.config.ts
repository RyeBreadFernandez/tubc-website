import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.135'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'uclabackpackingclub.com' }],
        destination: 'https://www.uclabackpackingclub.com/:path*',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elnhmxedfcbudndqnpuf.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
