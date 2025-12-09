/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;
