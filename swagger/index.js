const auth = require("./auth.swagger.json");
const employee = require("./employee.swagger.json");

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "HRMS API",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:5000"
    }
  ],
  components: {
    ...employee.components
  },
  paths: {
    ...auth.paths,
    ...employee.paths
  }
};
