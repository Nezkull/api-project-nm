const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/addUser') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statuseCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();

      const bodyParams = query.parse(bodyString);

      jsonHandler.addUser(request, response, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedURL.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedURL.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else if (parsedURL.pathname === '/notReal') {
    jsonHandler.notFound(request, response);
  } else {
    jsonHandler.notFound(request, response);
  }
};

const handleHead = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/getUsers') {
    jsonHandler.getUsersMeta(request, response);
  } else if (parsedURL.pathname === '/notReal') {
    jsonHandler.notFoundMeta(request, response);
  } else {
    jsonHandler.notFoundMeta(request, response);
  }
};

/*
const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    // '/updateUser': jsonHandler.updateUser,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.getUsersMeta,
  },
};
*/
const onRequest = (request, response) => {
  console.log(request.url);

  const parsedURL = url.parse(request.url);

  /*
  if (urlStruct[request.method][parsedURL.pathname]) {
    urlStruct[request.method][parsedURL.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
  */
  if (request.method === 'POST') {
    handlePost(request, response, parsedURL);
  } else if (request.method === 'GET') {
    handleGet(request, response, parsedURL);
  } else {
    handleHead(request, response, parsedURL);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
