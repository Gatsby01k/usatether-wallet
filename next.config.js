/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // --- REQUIRED FOR METAMASK + WAGMI ---
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              connect-src 'self' https://api.0x.org https://*.walletconnect.com https://rpc.ankr.com https://*.infura.io https://mainnet.optimism.io https://base-mainnet.infura.io data: blob:;
              img-src 'self' data: blob:;
              script-src 'self' 'unsafe-eval' 'unsafe-inline' chrome-extension: moz-extension:;
              style-src 'self' 'unsafe-inline';
              frame-src 'self' https://*.walletconnect.com;
              font-src 'self' data:;
            `.replace(/\n/g, " "),
          },

          // --- OTHER SECURITY HEADERS ---
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
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
