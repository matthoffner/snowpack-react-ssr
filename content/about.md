# about

This is an example project using state of the art React server side rendering and Snowpack for managing client dependencies.

## Why React SSR?

Rendering React on the server improves performance and SEO. While React supports this with `renderToNodeStream` there is a little bit more configuration needed to work with libraries like Material UI. To server render styles from Material UI I've added a custom `sheets-registry-transformer` to extract and append to internal stylesheets.

## Why Snowpack?

Snowpack is a new project that helps simplify frontend dev tooling. The "unbundled" approach is relatively new, but with HTTP/2 support widespread its a beneficial technique. Having HTTP/2 in dev mode is also something that helps and not widely adopted yet.

## Why Apollo?

I wanted to give Apollo a try and it seems to be the defacto graphql library.