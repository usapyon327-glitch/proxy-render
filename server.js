const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;
const TARGET_URL = 'https://crazygames.com';

app.use('/', createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    ws: true,
    logger: console,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        proxyReq.setHeader('Referer', TARGET_URL);
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['X-Frame-Options'] = 'ALLOWALL';
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
