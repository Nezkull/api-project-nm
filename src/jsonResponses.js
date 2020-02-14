const users = {};

const respondJSON = (request, response, status, obj) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    
    response.writeHead(status, headers);
    response.write(JSON.stringify(obj));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    
    response.writeHead(status, headers);
    response.end();
};

const getUsers = (request, response) => {
    const responseJSON = {
        users,
    };
    
    return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
    return respondJSONMeta(request, response, 200);
};

const updateUser = (request, response) => {
    const newUser = {
        createdAt: Date.now(),
    };
    
    users[newUser.createdAt] = newUser;
    
    return respondJSON(request, response, 204, newUser);
};
/*
const getNotReal = (request, response) => {
    const responseJSON = {
        message: 'This '
    }
};
*/
const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };
    
    respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
    respondJSONMeta(request, response, 404);
};

module.exports = {
    getUsers,
    getUsersMeta,
    updateUser,
    notFound,
    notFoundMeta,
};