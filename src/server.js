const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    'GET': {
        '/': htmlHandler.getIndex,
        '/style.css': htmlHandler.getCSS,
        'getUsers': jsonHandler.getUsers,
        '/notReal': jsonHandler.notFound,
        notFound: jsonHandler.notFound,
    },
    'HEAD': {
        '/getUsers': jsonHandler.getUsersMeta,
        notFound: jsonHandler.notFoundMeta,
    },
};

const onRequest = (request, response) => {
    console.log(request.url);
    
    const parsedURL = url.parse(request.url);
    
    if(urlStruct[request.method][parsedURL.pathname]){
        urlStruct[request.method][parsedURL.pathname](request, response);
    }else{
        urlStruct[request.method].notFound(request, response);
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);