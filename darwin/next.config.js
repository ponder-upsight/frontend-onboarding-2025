/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  }, // TODO : 임시
  typescript: {
    ignoreBuildErrors: true, // TODO : 임시
  },
  reactStrictMode: false,
  output: "standalone",
  compiler: {
    // removeConsole: {
    //   exclude: ["error", "warn"],
    // },
  },
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 768, 1080, 1200, 1920],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
  swcMinify: true,
};
