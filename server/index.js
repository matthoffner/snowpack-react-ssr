import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import http from 'http';
import fs from 'fs';
import App from '../src/App';

const development = process.env.NODE_ENV;
const SERVER_PORT = 3000;
const criticalCSS = fs.readFileSync(`${process.cwd()}/src/index.css`);

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
            <body>`);
  const node = renderToNodeStream(<App />);
  node.pipe(res, { end: false });
  node.on('end', () => {
    res.write(
      development
        ? `<script type="module" src="http://localhost:8080/_dist_/index.js"></script>
      <script type="module" src="http://localhost:8080/__snowpack__/hmr.js"></script>`
        : '',
    );
    res.end();
  });
};

const server = http.createServer(render);

server.on('error', (err) => console.error(err));

server.listen(SERVER_PORT, () => {
  console.log('http server started on port', SERVER_PORT);
});
