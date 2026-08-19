import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: deploys to Vercel, Netlify, Cloudflare Pages or GitHub Pages
  // with no server. Remove this block if you later add server actions / API routes.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
