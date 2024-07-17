const withTM = require('next-transpile-modules')([
  '@ant-design/icons-svg',
  '@ant-design/icons',
  'rc-util', // Transpile rc-util
  '@babel/runtime', // Also ensure @babel/runtime is transpiled
]);

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    return config;
  },
});
