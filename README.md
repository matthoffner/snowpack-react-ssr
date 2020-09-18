# snowpack-react-ssr

Minimal example using React server side rendering with snowpack.

## Features

- Babel node for server side jsx support
- `renderToNodeStream` for improved server rendering performance
- React Refresh works Snowpack
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

Its worth noting that server reloading conflicts with hot reloading since a full refresh is needed for server rendered html updates to show. I've included a separate option that will restart the server for changes to the src directory.

```sh
npm run serve
```
