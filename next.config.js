// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Шим RN AsyncStorage (если ещё не добавлен)
      '@react-native-async-storage/async-storage': path.resolve(
        __dirname,
        'shims/asyncStorageShim.js'
      ),
      // Пустышка для pino-pretty (WalletConnect логгер)
      'pino-pretty': path.resolve(__dirname, 'shims/emptyModule.js'),
      // <<< главное новое: Metamask SDK в node-сборке требует 'encoding' — на вебе не нужен
      encoding: path.resolve(__dirname, 'shims/emptyModule.js'),
    };
    return config;
  },
};

module.exports = nextConfig;
