/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ['53.img.avito.st'],
    formats: ['image/avif', 'image/webp']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://scrapper-next.herokuapp.com//api/:path*',

      }
    ]
  }
}

module.exports = nextConfig
