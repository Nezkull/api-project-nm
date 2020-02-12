const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    'GET': {
        '/': htmlHandler.getIndex,
        '/style.css': htmlHandler.getCSS,
        'getUsers': jsonHandler.temp,
        '/notReal': jsonHandler.temp,
        notFound: jsonHandler.temp,
    },
    'HEAD': {
        '/getUsers': jsonHandler.tempMeta,
    },
};

const onRequest = (request, response) => {
    console.log(request.url);
    
    const parsedURL = url.parse(request.url);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);