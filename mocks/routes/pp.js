// Use this file only as a guide for first steps. Delete it when you have added your own routes files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/get-started-routes

const { createRoute, createResponse, createResponseAll, createResponseSearchId } = require("../util");
const body = require("../MockBody/pp.json");
const pageData = require("../MockBody/pp-pages.json");

const createResponseSearchPP = ({collection}) => (req, res) => {
  const id = req.params.id;
  const datum = collection?.data?.find((data) => (data?._id === id));
  if (datum) {
    res.status(200);
    res.send({
      status: true,
      data: {
        ...datum,
        ...pageData,
      },
    });
  } else {
    res.status(404);
    res.send({
      message: "not found",
    });
  }
}

module.exports = createRoute([
  {
    id: 'get-ppies',
    endpoint: '/pp',
    method: 'GET',
    response: createResponseAll({collection: body})
  },
  {
    id: 'get-pp',
    endpoint: '/pp/:id',
    method: 'GET',
    response: createResponseSearchPP({collection: body})
  },
  {
    id: 'modify-pp',
    endpoint: '/pp/:id',
    method: ["DELETE", "PATCH", "PUT"],
    response: createResponse({})
  },
  {
    id: 'password-pp',
    endpoint: '/pp/:id/send-password',
    method: "POST",
    response: createResponse({})
  },
  {
    id: 'add-pp',
    endpoint: '/pp',
    method: "POST",
    response: createResponse({
      data: {
        _id: "60599134f421e04246e47c82"
      }
    })
  },

  //pages
  {
    id: 'get-pp-page',
    endpoint: '/pp/:ppid/page/:id',
    method: 'GET',
    response: createResponseSearchId({collection: {
      data: pageData?.pages
    }})
  },
  {
    id: 'modify-pp-page',
    endpoint: '/pp/:ppid/page/:id',
    method: ["DELETE", "PATCH", "PUT"],
    response: createResponse({})
  },
{
    id: 'add-pp-page',
    endpoint: '/pp/:ppid/page',
    method: "POST",
    response: createResponse({
      data: {
        _id: "6118d5564f0d6906da498725"
      }
    })
  },
])