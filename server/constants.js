export const SERVER_PORT = 3000;
export const SNOWPACK_HMR_SCRIPT =
  '<script>window.HMR_WEBSOCKET_URL = "ws://localhost:8080"</script>';
export const SNOWPACK_DEV_SCRIPT = `<script type="module" src="http://localhost:8080/_dist_/index.js"></script>
<script>window.$RefreshRuntime$ = {register: () => {}, createSignatureFunctionForTransform: () => () => {}};
window.$RefreshSig$ = () => (type) => type;</script>`;
