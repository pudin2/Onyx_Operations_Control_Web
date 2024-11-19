const { env } = require('process');

const target = env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:8050';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
