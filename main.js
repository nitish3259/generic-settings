//main.js
const express = require("express");
const cors = require("cors");
const databaseConfiguration = require("./configurations/database.js");
const todo = require("./routers/routes.js");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//connecting to  mongodb
databaseConfiguration();

//adding cors
app.use(cors({ origin: true, credentials: true }));

// adding  middlewares
app.use(express.json({ extended: false }));
app.get("/", (req, res) =>
  res.send("Hello there!! Cheers !! The server is up and running")
);

// using the todo routes
app.use("/api/genericSettings", todo);

// listen
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
