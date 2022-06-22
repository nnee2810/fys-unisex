/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["dummyimage.com", "do2g7bfc9eoz9.cloudfront.net"],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
