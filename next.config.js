/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["picsum.photos", "ui-avatars.com"],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
