# snowpack-react-ssr

Minimal example using React server side rendering plus webpack. 

## Features

* Uses Babel Node instead of webpack
* Uses `renderToNodeStream` for better perf
* No server side styles setup, todo add material ui


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