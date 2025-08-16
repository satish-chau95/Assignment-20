/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@ai-sdk/groq"],
  },
  // Enable static exports for Netlify deployment
  output: "standalone",
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Environment variables configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
