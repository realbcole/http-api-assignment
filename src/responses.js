const respond = (response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const respondMeta = (response, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.end();
};

const notFound = (req, res, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
    return respond(res, 404, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respond(res, 404, JSON.stringify(responseJSON), 'application/json');
};

const notFoundMeta = (req, res) => {
  respondMeta(res, 404, 'application/json');
};

const getSuccess = (req, res, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>This is a successful response</message></response>';
    return respond(res, 200, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'This is a successful response',
  };

  return respond(res, 200, JSON.stringify(responseJSON), 'application/json');
};

const getBadRequest = (req, res, acceptedTypes) => {
  const params = req.url.split('?')[1];
  if (params === 'valid=true') {
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = '<response><message>This request has the required parameters</message></response>';
      return respond(res, 200, responseXML, 'text/xml');
    }

    const responseJSON = {
      message: 'This request has the required parameters',
    };

    return respond(res, 200, JSON.stringify(responseJSON), 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
    return respond(res, 400, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'Missing valid query parameter set to true',
    id: 'badRequest',
  };

  return respond(res, 400, JSON.stringify(responseJSON), 'application/json');
};

const getUnauthorized = (req, res, acceptedTypes) => {
  const params = req.url.split('?')[1];
  if (params === 'loggedIn=yes') {
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = '<response><message>You have successfully viewed the content</message></response>';
      return respond(res, 200, responseXML, 'text/xml');
    }

    const responseJSON = {
      message: 'You have successfully viewed the content',
    };

    return respond(res, 200, JSON.stringify(responseJSON), 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>';
    return respond(res, 401, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  return respond(res, 401, JSON.stringify(responseJSON), 'application/json');
};

const getForbidden = (req, res, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>You do not have access to this content</message><id>forbidden</id></response>';
    return respond(res, 403, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  return respond(res, 403, JSON.stringify(responseJSON), 'application/json');
};

const getInternalServerError = (req, res, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>';
    return respond(res, 500, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  return respond(res, 500, JSON.stringify(responseJSON), 'application/json');
};

const getNotImplemented = (req, res, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';
    return respond(res, 501, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  return respond(res, 501, JSON.stringify(responseJSON), 'application/json');
};

module.exports = {
  notFound,
  notFoundMeta,
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternalServerError,
  getNotImplemented,
};
