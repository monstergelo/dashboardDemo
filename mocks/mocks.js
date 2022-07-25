const { createServer } = require("@mocks-server/main");
const company = require("./routes/company");

const server = createServer();

server.start().then(() => {
  const { loadRoutes } = server.mock.createLoaders();
  loadRoutes([company]);

});