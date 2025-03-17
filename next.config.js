/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: process.env.NODE_ENV === 'development',
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'avatars.githubusercontent.com',


    }
  ]
  }
}

module.exports = nextConfig
