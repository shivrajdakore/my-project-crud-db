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
      description: "Express + MySQL CRUD demo with profile photo upload",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/users.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerSpec));

module.exports = router;
