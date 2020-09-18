# snowpack-react-ssr

Minimal example using React server side rendering with snowpack.

## Features

- Babel node for server side jsx support
- `renderToNodeStream` for improved server rendering performance
- React Refresh works via Snowpack
- Inlines CSS server side for optimal first contentful paint

## Usage

```sh
npm install
```

```sh
npm run start
```

This will launch a server and client dev server, they can be invoked separately:

```sh
npm run server
```

Will run on port 3000 by default.

```sh
npm run client
```

Will run on port 8080 by default.

Server reloading conflicts with hot reloading since a full refresh is needed for server rendered html updates to show. Included is a separate npm script that will restart the server when changes are made to the src directory.

```sh
npm run serve
```

## Production build

```sh
npm run build
```

Included is the webpack plugin to optimize the client build. Also included is `modulepreload` script tags. To run the server in production mode:

```sh
npm run production
```
