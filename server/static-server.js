import zlib from 'zlib';
import stream from 'stream';
import path from 'path';

const setContentType = (extension) => {
  const supported = {
    '.js': 'application/javascript',
    '.css': 'text/css',
  };
  return supported[extension] || 'text/plain';
};

export default function serveFile(req, res) {
  const fileExtension = path.extname(req.url);
  const output = fs.createReadStream(`${process.cwd()}/build/${req.url}`);
  res.setHeader('Vary', 'Accept-Encoding');
  let acceptEncoding = req.headers['accept-encoding'];
  if (!acceptEncoding) {
    acceptEncoding = '';
  }
  const onError = (err) => {
    if (err) {
      res.end();
      console.error('An error occurred:', err);
    }
  };
  res.setHeader('Content-Type', setContentType(fileExtension));
  if (/\bbr\b/.test(acceptEncoding)) {
    res.writeHead(200, { 'Content-Encoding': 'br' });
    stream.pipeline(output, zlib.createBrotliCompress(), res, onError);
  } else if (/\bgzip\b/.test(acceptEncoding)) {
    res.writeHead(200, { 'Content-Encoding': 'gzip' });
    stream.pipeline(output, zlib.createGzip(), res, onError);
  } else if (/\bdeflate\b/.test(acceptEncoding)) {
    res.writeHead(200, { 'Content-Encoding': 'deflate' });
    stream.pipeline(output, zlib.createDeflate(), res, onError);
  } else {
    res.writeHead(200, {});
    stream.pipeline(output, res, onError);
  }
  return;
}
