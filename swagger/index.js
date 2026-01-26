import { createRequire } from "module";

const require = createRequire(import.meta.url);

const auth = require("./auth.swagger.json");
const employee = require("./employee.swagger.json");

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "HRMS API",
    version: "1.0.0",
  },
  servers: [
    { url: "http://localhost:5000" },
  ],
  components: {
    ...(employee.components || {}),
    ...(auth.components || {}),
  },
  paths: {
    ...(auth.paths || {}),
    ...(employee.paths || {}),
  },
};

export default swaggerSpec;
