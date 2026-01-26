import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../swagger/index.js";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.js";
import employeeRoutes from "./routes/employee.routes.js";
import permissionRoute from "./routes/permission.routes.js";
import roleRoutes from "./routes/role.routes.js";

dotenv.config();

const app = express();

/* ================= Middleware ================= */
app.use(cors());

app.use(
  helmet({
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    originAgentCluster: false,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "blob:"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:"],
        "font-src": ["'self'", "data:"],
      },
    },
  }),
);

app.use(express.json());

/* ================= Swagger ================= */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ================= Routes ================= */
app.use("/api/auth", authRoutes);
app.use("/api", employeeRoutes);
app.use("/api", roleRoutes);

app.use("/api/permissions", permissionRoute);

/* ================= DB Test ================= */
sequelize
  .authenticate()
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

export default app;
