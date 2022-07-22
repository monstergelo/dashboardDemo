// Use this file only as a guide for first steps. Delete it when you have added your own routes files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/get-started-routes

const { createRoute, createResponse, createResponseAll, createResponseSearchId } = require("../util");
const body = require("../MockBody/trainee.json");

module.exports = createRoute([
  {
    id: 'get-trainees',
    endpoint: '/trainee',
    method: 'GET',
    response: createResponseAll({collection: body})
  },
  {
    id: 'get-trainee',
    endpoint: '/trainee/:id',
    method: 'GET',
    response: createResponseSearchId({collection: body})
  },
  {
    id: 'modify-trainee',
    endpoint: '/trainee/:id',
    method: ["DELETE", "PATCH", "PUT"],
    response: createResponse({})
  },
  {
    id: 'password-trainee',
    endpoint: '/trainee/:id/send-password',
    method: "POST",
    response: createResponse({})
  },
  {
    id: 'add-trainee',
    endpoint: '/trainee',
    method: "POST",
    response: createResponse({
      data: {
        _id: "60505e7a1b3e7252268511b7"
      }
    })
  },
])