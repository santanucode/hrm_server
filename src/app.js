const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const sequelize = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger.json");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// REST routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// DB Test
sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

module.exports = app;
