import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import http from 'http';
import staticServer from './static-server';
import { buildScriptHtml, criticalCSS } from './utils';
import {
  SERVER_PORT,
  SNOWPACK_HMR_SCRIPT,
  SNOWPACK_DEV_SCRIPT,
} from './constants';
import AppComponent from '../src/App';

const development = process.env.NODE_ENV === 'development';
const { preloadTags, scriptTags } = buildScriptHtml();

const app = (req, res) => {
  if (
    req.url.endsWith('.js') ||
    req.url.endsWith('.map') ||
    req.url.endsWith('.css')
  ) {
    staticServer(req, res);
  } else {
    res.write(`
        <html>
            <head>
                <link rel="canonical" url="${req.url}">
                <style>
                  ${criticalCSS.toString()}
                </style>
                ${development ? SNOWPACK_HMR_SCRIPT : preloadTags}
            </head>
            <body><div id="root">`);
    const node = renderToNodeStream(<AppComponent />);
    node.pipe(res, { end: false });
    node.on('end', () => {
      res.write(
        development
          ? `</div></body>${SNOWPACK_DEV_SCRIPT}</html>`
          : `</div></body>${scriptTags}</html>`,
      );
      res.end();
    });
  }
};

const server = http.createServer(app);

server.on('error', (err) => console.error(err));

server.listen(SERVER_PORT, () => {
  console.log('http server started on port', SERVER_PORT);
});
