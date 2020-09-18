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
