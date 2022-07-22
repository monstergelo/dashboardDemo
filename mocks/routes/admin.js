// Use this file only as a guide for first steps. Delete it when you have added your own routes files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/get-started-routes

const { createRoute, createResponse, createResponseAll, createResponseSearchId } = require("../util");
const body = require("../MockBody/admin.json");

module.exports = createRoute([
  {
    id: 'get-admins',
    endpoint: '/admin',
    method: 'GET',
    response: createResponseAll({collection: body})
  },
  {
    id: 'get-admin',
    endpoint: '/admin/:id',
    method: 'GET',
    response: createResponseSearchId({collection: body})
  },
  {
    id: 'modify-admin',
    endpoint: '/admin/:id',
    method: ["DELETE", "PATCH", "PUT"],
    response: createResponse({})
  },
  {
    id: 'password-admin',
    endpoint: '/admin/:id/send-password',
    method: "POST",
    response: createResponse({})
  },
  {
    id: 'add-admin',
    endpoint: '/admin',
    method: "POST",
    response: createResponse({
      data: {
        _id: "6059912cf421e04246e47c25"
      }
    })
  },
])