// swagger.js
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const express = require("express");

const router = express.Router();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users CRUD API",
      version: "1.0.0",
      description: "Express + MySQL CRUD demo with Swagger for users table",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  // Updated to point to the new users.js routes file
  apis: ["./routes/users.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerSpec));

module.exports = router;
