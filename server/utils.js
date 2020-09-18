import fs from 'fs';

const production = process.env.NODE_ENV === 'production';

export const buildScriptHtml = () => {
  const buildScriptHtml = (scripts) => {
    return scripts
      .filter((script) => script.endsWith('.js'))
      .map((script) => `<script type="module" src="${script}"></script>`)
      .join('');
  };
  const buildPreloadHtml = (scripts) => {
    return scripts
      .filter((script) => script.endsWith('.js'))
      .map((script) => `<script type="modulepreload" src="${script}"></script>`)
      .join('');
  };
  let scriptTags;
  let preloadTags;
  if (production) {
    const assetManifest = (scriptTags = JSON.parse(
      fs.readFileSync(`${process.cwd()}/build/asset-manifest.json`),
    ));
    scriptTags = buildScriptHtml(Object.values(assetManifest));
    preloadTags = buildPreloadHtml(Object.values(assetManifest));
  }
  return { scriptTags, preloadTags };
};

export const criticalCSS = fs.readFileSync(`${process.cwd()}/src/critical.css`);
