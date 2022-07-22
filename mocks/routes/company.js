// Use this file only as a guide for first steps. Delete it when you have added your own routes files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/get-started-routes

const { createRoute, createResponse, createResponseAll, createResponseSearchId } = require("../util");
const body = require("../MockBody/company.json");

module.exports = createRoute([
  {
    id: 'get-companies',
    endpoint: '/company',
    method: 'GET',
    response: createResponseAll({collection: body})
  },
  {
    id: 'get-company',
    endpoint: '/company/:id',
    method: 'GET',
    response: createResponseSearchId({collection: body})
  },
  {
    id: 'modify-company',
    endpoint: '/company/:id',
    method: ["DELETE", "PATCH", "PUT"],
    response: createResponse({})
  },
  {
    id: 'password-company',
    endpoint: '/company/:id/send-password',
    method: "POST",
    response: createResponse({})
  },
  {
    id: 'add-company',
    endpoint: '/company',
    method: "POST",
    response: createResponse({
      data: {
        _id: "60505089803c864c30aa60b3"
      }
    })
  },
])