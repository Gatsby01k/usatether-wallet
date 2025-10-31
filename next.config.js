// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  webpack: (config) => {
    // Шимим RN AsyncStorage, чтобы MetaMask SDK не требовал настоящий RN-модуль
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@react-native-async-storage/async-storage': path.resolve(
        __dirname,
        'shims/asyncStorageShim.js'
      ),
      // На всякий: если сборка где-то потребует pino-pretty в рантайме — дадим пустую заглушку
      'pino-pretty': path.resolve(__dirname, 'shims/emptyModule.js'),
    };
    return config;
  },
};

module.exports = nextConfig;
