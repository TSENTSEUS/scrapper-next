/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ['https://53.img.avito.st/']
  }
}

module.exports = nextConfig
