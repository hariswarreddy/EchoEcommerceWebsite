const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // This matches the starting path
    createProxyMiddleware({
      target: 'http://100.115.106.99:4000',
      changeOrigin: true,  // Ensures Host headers match the backend
    })
  );
};
