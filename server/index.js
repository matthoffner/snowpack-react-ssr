import express from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';
import sheetsRegistryStream from './sheets-registry-stream';
import Provider from '../src/provider';
import App from '../src/Loading';
import NotFound from '../src/NotFound';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { getDataFromTree } from "@apollo/react-ssr";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from 'isomorphic-fetch';

const Router = url => {
    const routes = {
        '/': App
    }
    return routes[url];
}

const app = express();

app.get('*', (req, res) => {
    const Route = Router(req.url);
    const sheetsRegistry = new ServerStyleSheets();
    if (!Route) {
        res.status(404);
        const errorStream = renderToNodeStream(<NotFound />);
        errorStream.pipe(res);
        errorStream.on('end', () => {
            res.end();
        });
        return;
    }

    const client = new ApolloClient({
        ssrMode: true,
        //   link: new SchemaLink({ schema }),
        link: new HttpLink({
          uri: 'https://m5j9784k8j.sse.codesandbox.io',
          fetch: fetch
        }),
        cache: new InMemoryCache()
    });

    const node = sheetsRegistry.collect(
        <ApolloProvider client={client}>
            <Provider>
                <Route />
            </Provider>
        </ApolloProvider>
    );
    getDataFromTree(App).then(() => {
        const initialState = client.extract();
        const routeStream = renderToNodeStream(node).pipe(sheetsRegistryStream(sheetsRegistry)).on('error', (err) => {
            console.log('server rendering error');
        });
        res.write(`
        <html>
            <head>
                <link rel="canonical" url="${req.url}">
                <script>window.HMR_WEBSOCKET_URL = "ws://localhost:8080"</script>
            </head>
            <body>
                <div id="root">`);
        routeStream.pipe(res, { end: false });
        routeStream.on("end", () => {
        res.write(`
                </div>
                <script>window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>
                <script type="module" src="http://localhost:8080/_dist_/index.js"></script>
                <script type="module" src="http://localhost:8080/__snowpack__/hmr.js"></script>
            </body>
        </html>`);
        res.end();
        });
    });
});

app.listen(80, () => {
    console.log('listening on port 80');
});