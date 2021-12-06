const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    ["/auth/google", "/auth", "/posts"],
    createProxyMiddleware({ target: "http://localhost:3001" })
  );
};
