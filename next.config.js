/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ['53.img.avito.st'],
    formats: ['image/avif', 'image/webp']
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://scrapper-next.herokuapp.com/" }
        ]
      }
    ]
  }
}

module.exports = nextConfig
