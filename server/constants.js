export const SERVER_PORT = 3000;
export const DEV_SERVER_PORT = 8080;
export const SNOWPACK_HMR_SCRIPT = `<script>window.HMR_WEBSOCKET_URL = "ws://localhost:${DEV_SERVER_PORT}"</script>`;
export const SNOWPACK_DEV_SCRIPT = `<script type="module" src="http://localhost:${DEV_SERVER_PORT}/_dist_/index.js"></script>
<script>window.$RefreshRuntime$ = {register: () => {}, createSignatureFunctionForTransform: () => () => {}};
window.$RefreshSig$ = () => (type) => type;</script>`;
