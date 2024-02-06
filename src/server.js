const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': responseHandler.getSuccess,
    '/badRequest': responseHandler.getBadRequest,
    '/unauthorized': responseHandler.getUnauthorized,
    '/forbidden': responseHandler.getForbidden,
    '/internal': responseHandler.getInternalServerError,
    '/notImplemented': responseHandler.getNotImplemented,
    notFound: responseHandler.notFound,
  },
  HEAD: {
    notFound: responseHandler.notFoundMeta,
  },
};

const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const acceptedTypes = req.headers.accept.split(',');

  if (!urlStruct[req.method]) return urlStruct.HEAD.notFound(req, res);

  if (urlStruct[req.method][parsedUrl.pathname]) {
    return urlStruct[req.method][parsedUrl.pathname](req, res, acceptedTypes);
  }

  return urlStruct[req.method].notFound(req, res, acceptedTypes);
};

http.createServer(onRequest).listen(port, () => {
  // console.log(`Listening on port ${port}`);
});
