/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.loveyourdog.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'zoipet.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.tgdd.vn',
        pathname: '**'
      }
    ]
  }
}

export default nextConfig
