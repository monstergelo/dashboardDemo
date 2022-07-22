const createResponse = (responseBody) => (_, res) => {
  res.status(200);
  res.send(responseBody || {});
}

const createResponseAll = ({collection}) => (_, res) => {

  if (collection) {
    res.status(200);
    res.send(collection);
  } else {
    res.status(404);
    res.send({
      message: "not found",
    });
  }
}

const createResponseSearchId = ({collection}) => (req, res) => {
  const id = req.params.id;
  const datum = collection?.data?.find((data) => (data?._id === id));
  if (datum) {
    res.status(200);
    res.send({
      status: true,
      data: datum,
    });
  } else {
    res.status(404);
    res.send({
      message: "not found",
    });
  }
}

const createRoute = (variants) => {
  const route = []
  if (variants && Array.isArray(variants)) {
    variants?.forEach((item) => {
      const variant = {
        id: item?.id,
        url: item?.endpoint, // url in express format
        method: item?.method, // HTTP method
        variants: [
          {
            id: "success", // id of the variant
            response: item?.response
          },
        ],
      }

      route.push(variant)
    })
  }

  return route
}

module.exports = {
  createResponseAll,
  createResponseSearchId,
  createResponse,
  createRoute
}
