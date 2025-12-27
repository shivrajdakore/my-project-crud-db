const express = require("express");
const path = require("path");
const app = express();

const swaggerRouter = require("./swagger");
const usersRouter = require("./routes/users");

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api-docs", swaggerRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("Server running → http://localhost:3000");
  console.log("Swagger UI → http://localhost:3000/api-docs");
});
