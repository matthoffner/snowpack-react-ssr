# snowpack-react-ssr

Minimal example using React server side rendering with snowpack. 

## Features

* Uses Babel Node instead of webpack for server
* Uses `renderToNodeStream` for better perf
* Material UI Streaming SSR
* Apollo SSR

todo: production build for server and snowpack config

```js
npm install
```

```js
npm run dev
```

This will run `snowpack dev` and start the react ssr server

## Notes on working with snowpack 

See `server/index.js` for implementation. Set HMR_WEBSOCKET_URL to the snowpack server in your server rendered html:

```js
<script>window.HMR_WEBSOCKET_URL = "ws://localhost:8080"</script>
````

Include the scripts that the browser version creates:

```js
<script type="module" src="http://localhost:8080/_dist_/index.js"></script>
<script type="module" src="http://localhost:8080/__snowpack__/hmr.js"></script>
```