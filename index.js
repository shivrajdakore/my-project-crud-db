const express = require("express");
const app = express();

const swaggerRouter = require("./swagger");
const usersRouter = require("./routes/users");

app.use(express.json());

// Routes
app.use("/api-docs", swaggerRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("Server running → http://localhost:3000");
  console.log("Swagger UI → http://localhost:3000/api-docs");
});
