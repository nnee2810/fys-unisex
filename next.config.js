/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "dummyimage.com",
      "ui-avatars.com",
      "d3k53xq1i8mhfl.cloudfront.net",
    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
