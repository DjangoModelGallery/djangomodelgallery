/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_BASE_PATH,

  output: process.env.NEXT_PUBLIC_OUTPUT_MODE || "standalone",
};

export default nextConfig;
