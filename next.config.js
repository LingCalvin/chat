module.exports = {
  eslint: {
    dirs: [
      'app',
      'common',
      'components',
      'features',
      'lib',
      'mocks',
      'pages',
      'styles',
    ],
  },
  reactStrictMode: true,
  async rewrites() {
    if (process.env.NODE_ENV === 'test') {
      return [];
    }
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_AUTH_SERVER}/:path*`,
      },
    ];
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
};
