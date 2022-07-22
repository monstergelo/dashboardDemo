// Use this file only as a guide for first steps. Delete it when you have added your own routes files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/get-started-routes

const { createRoute, createResponse, createResponseAll } = require("../util");
const body = require("../MockBody/training.json");
const bodyParticipant = require("../MockBody/training.json");
const bodySchedule = require("../MockBody/training.json");
const bodySingle = require("../MockBody/training-single.json");

const createResponseSingle = () => (_, res) => {

  if (bodySingle) {
    res.status(200);
    res.send(bodySingle);
  } else {
    res.status(404);
    res.send({
      message: "not found",
    });
  }
}

const createResponseParticipant = () => (_, res) => {

  if (bodyParticipant) {
    res.status(200);
    res.send(bodyParticipant);
  } else {
    res.status(404);
    res.send({
      message: "not found",
    });
  }
}

const createResponseSchedule = () => (_, res) => {

  if (bodySchedule) {
    res.status(200);
    res.send(bodySchedule);
  } else {
    res.status(404);
    res.send({
      message: "not found",
    });
  }
}

module.exports = createRoute([
  {
    id: 'get-trainings',
    endpoint: '/training',
    method: 'GET',
    response: createResponseAll({collection: body})
  },
  {
    id: 'get-training',
    endpoint: '/training/:id',
    method: 'GET',
    response: createResponseSingle()
  },
  {
    id: 'modify-training',
    endpoint: '/training/:id',
    method: ["DELETE", "PATCH", "PUT"],
    response: createResponse({})
  },
  {
    id: 'password-training',
    endpoint: '/training/:id/send-password',
    method: "POST",
    response: createResponse({})
  },
  {
    id: 'add-training',
    endpoint: '/training',
    method: "POST",
    response: createResponse({
      data: {
        _id: "60599134f421e04246e47c83"
      }
    })
  },

  //participant
  {
    id: 'get-training-participant',
    endpoint: '/training/:id/participant',
    method: 'GET',
    response: createResponseParticipant()
  },
  {
    id: 'modify-training-participant',
    endpoint: '/training/:id/participant/:participantid',
    method: ["DELETE", "PATCH", "PUT"],
    response: createResponse({})
  },
{
    id: 'add-training-participant',
    endpoint: '/training/:id/participant',
    method: "POST",
    response: createResponse({
      data: {
        _id: "60cf6f6c114da383af520da0"
      }
    })
  },

  //schedule
  {
    id: 'get-training-schedule',
    endpoint: '/training/:id/schedule',
    method: 'GET',
    response: createResponseSchedule()
  },
  {
    id: 'modify-training-schedule',
    endpoint: '/training/:id/schedule/:scheduleid',
    method: ["DELETE", "PATCH", "PUT"],
    response: createResponse({})
  },
{
    id: 'add-training-schedule',
    endpoint: '/training/:id/schedule',
    method: "POST",
    response: createResponse({
      data: {
        _id: "60cff1bddc7ea8db37ece5c6"
      }
    })
  },
])