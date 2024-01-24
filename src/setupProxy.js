const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.coingecko.com",
      changeOrigin: true,
      onProxyRes(proxyRes) {
        proxyRes.headers["Access-Control-Allow-Origin"] =
          "https://dextermtor-rahul.github.io/";
      },
    })
  );
};
