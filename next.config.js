/** @type {import('next').NextConfig} */

// ? https://vercel.com/docs/workflow-collaboration/vercel-toolbar/in-production-and-localhost/add-to-localhost
const withVercelToolbar = require('@vercel/toolbar/plugins/next')();

const nextConfig = {
  // ? allow using images from Sanity's CDN.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    // Used to guard against accidentally leaking SANITY_API_READ_TOKEN to the browser
    taint: true,
  },
  logging: {
    fetches: { fullUrl: false },
  },
};

module.exports = withVercelToolbar(nextConfig);