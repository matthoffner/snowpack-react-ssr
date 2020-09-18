import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import http from 'http';
import fs from 'fs';
import App from '../src/App';

const development = process.env.NODE_ENV;
const SERVER_PORT = 3000;
const SNOWPACK_DEV_SCRIPT = `<script type="module" src="http://localhost:8080/_dist_/index.js"></script>
<script>window.$RefreshRuntime$ = {register: () => {}, createSignatureFunctionForTransform: () => () => {}};
window.$RefreshSig$ = () => (type) => type;</script>`;
const criticalCSS = fs.readFileSync(`${process.cwd()}/src/critical.css`);

const render = (req, res) => {
  res.write(`
        <html>
            <head>
                <link rel="canonical" url="${req.url}">
                <style>
                  ${criticalCSS.toString()}
                </style>
                ${
                  development
                    ? `<script>window.HMR_WEBSOCKET_URL = "ws://localhost:8080"</script>`
                    : ''
                }
            </head>
            <body><div id="root">`);
  const node = renderToNodeStream(<App />);
  node.pipe(res, { end: false });
  node.on('end', () => {
    res.write(development ? `</div></body>${SNOWPACK_DEV_SCRIPT}` : '');
    res.end();
  });
};

const server = http.createServer(render);

server.on('error', (err) => console.error(err));

server.listen(SERVER_PORT, () => {
  console.log('http server started on port', SERVER_PORT);
});
