/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["lh3.googleusercontent.com"],
    },
    webpack: (config, { isServer }) => {
      // Add .mjs extension to the resolver
      config.resolve.extensions.push('.mjs'), // Google user images
      'deped.depedtandagn8n.shop'
  
      // Process .mjs files as javascript/auto so they are properly parsed
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      });
  
      // Optionally, if you encounter issues with node core modules, add fallbacks
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
        };
      }
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  