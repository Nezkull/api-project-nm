const users = {};
const posts = {};

// make it an object of objects
// an object that contains all of the images in the media folder
/*
const images = {
  bread: {
    id: 'bread',
    link: '../media/bread.png',
  },
  lamp: {
    id: 'lamp',
    link: '../media/lamp.png',
  },

};
*/

const respondJSON = (request, response, status, obj) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(obj));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// not really needed
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};


// function that will get the posts from the server
const getPosts = (request, response) => {
  const responseJSON = {
    // photo, // the image id
    posts,
  };
    // this will probably need more work

  console.dir(posts);
  /*
  console.log(posts[0].value);
  console.log(posts[0].resp1);
  console.log(posts[0].resp2);
  console.log(posts[0].resp3);
  console.log(posts[0].resp4);
  console.log(posts[0].lie);
  */

  /*
    // check to see if parameter is set
    if(!param.id){
        // loop through all of the image objects
        for(let i = 0; i < images.count; i++){
            // logic check for if query param is not valid
            if(param.id !== images[i].id){

            }
        }
    }
    */
  return respondJSON(request, response, 200, responseJSON);
};

/*
const playGame = (request, response) => {

};
*/

// I don't think I need to do XML or meta responses for this project
const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

// copy and modify this to allow for multiple responses. Params: request, response, body.
// body has .resp1, .resp2, .resp3, .resp4, and .lie. the .resp[n] are strings,
// .lie is an int that must be between 0 & 4.
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// this should be pretty much done
const addPost = (request, response, body) => {
  const responseJSON = {
    message: 'Name, 4 statements, lie selection, and image selection are all required.',
  };

  if(!body.name || !body.resp1 || !body.resp2 || !body.resp3 
     || !body.resp4 || !body.lie || !body.imageID){
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (posts[body.name]) {
    responseCode = 204;
  } else {
    posts[body.name] = {};
  }

  // can use the name as a way to search for posts (query parameter)
  // posts[body.name].name = body.name;
  posts[body.name].resp1 = body.resp1;
  posts[body.name].resp2 = body.resp2;
  posts[body.name].resp3 = body.resp3;
  posts[body.name].resp4 = body.resp4;
  posts[body.name].lie = body.lie;
  posts[body.name].imageID = body.imageID;

  // need image selector thing as well

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// I might allow them to do this
const updateUser = (request, response) => {
  const newUser = {
    createdAt: Date.now(),
  };

  users[newUser.createdAt] = newUser;

  return respondJSON(request, response, 204, newUser);
};

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
  addUser,
  updateUser,
  notFound,
  notFoundMeta,
  getPosts,
  addPost,
};
