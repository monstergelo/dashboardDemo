// Use this file only as a guide for first steps. Delete it when you have added your own routes files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/get-started-routes

const { createRoute, createResponseAll, createResponseSearchId } = require("../util");
const body = require("../MockBody/profile.json");

module.exports = createRoute([
  {
    id: 'get-profile',
    endpoint: '/profile',
    method: 'GET',
    response: createResponseAll({collection: body})
  },
  // {
  //   id: 'get-user',
  //   endpoint: '/users/:id',
  //   method: 'GET',
  //   response: createResponseSearchId({collection: body})
  // },
])