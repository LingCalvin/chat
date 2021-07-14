module.exports = {
  eslint: {
    dirs: ['app', 'common', 'components', 'features', 'lib', 'pages', 'styles'],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_AUTH_SERVER}/:path*`,
      },
    ];
  },
};
