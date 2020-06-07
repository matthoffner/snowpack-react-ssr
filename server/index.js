import express from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import App from '../src/App.jsx';
import NotFound from '../src/NotFound.jsx';

const app = express();

const Router = url => {
    const routes = {
        '/': <App />
    }
    return routes[url];
}

app.get('*', (req, res) => {
    const Route = Router(req.url);
    if (!Route) {
        res.status(404);
        const errorStream = renderToNodeStream(<NotFound />);
        errorStream.pipe(res);
        errorStream.on('end', () => {
            res.end();
        });
        return;
    }
    const routeStream = renderToNodeStream(Route);
    res.write(`
        <html>
            <head>
                <link rel="canonical" url="${req.url}">
                <script>window.HMR_WEBSOCKET_URL = "ws://localhost:8080"</script>
            </head>
            <body>
            <div id="root">`);
    routeStream.pipe(res, { end: false })
    routeStream.on("end", () => {
    res.write(`
            </div>
            <script type="module" src="http://localhost:8080/_dist_/index.js"></script>
            <script type="module" src="http://localhost:8080/__snowpack__/hmr.js"></script>
            </body>
        </html>`);
    res.end();
    });
});

app.listen(80, () => {
    console.log('listening on port 80');
});