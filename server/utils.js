import fs from 'fs';

const production = process.env.NODE_ENV === 'production';

export const buildScriptHtml = () => {
  const buildScriptHtml = (scripts) => {
    return scripts
      .filter((script) => script.endsWith('.js'))
      .map((script) => {
        return {
          scriptTags: `<script type="module" src="${script}"></script>`,
          preloadTags: `<script type="modulepreload" src="${script}"></script>`,
        };
      })
      .join('');
  };

  if (!production) {
    return {};
  }
  const assetManifest = (scriptTags = JSON.parse(
    fs.readFileSync(`${process.cwd()}/build/asset-manifest.json`),
  ));
  return buildScriptHtml(Object.values(assetManifest));
};

export const criticalCSS = fs.readFileSync(`${process.cwd()}/src/critical.css`);
