const express = require("express");
const app = express();
require("dotenv/config");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerDocs = require("./swagger");

// Env variables
const connectionString = process.env.MONGODB_URL;
const dbName = process.env.dbName;
const api = process.env.API_URL;

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Routes
const userRoutes = require("./routers/user");
const authRoutes = require("./routers/auth");
const subscriptionRoutes = require("./routers/subscription");
const paidSubscriptionRoutes = require("./routers/paidSubscription");
const webhookRoute = require("./routers/webhook");
const cardRoute = require("./routers/card");

app.use(`${api}/user`, userRoutes);
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/subscription`, subscriptionRoutes);
app.use(`${api}/subscribe`, paidSubscriptionRoutes);
app.use(`${api}/webhook`, webhookRoute);
app.use(`${api}/card`, cardRoute)

// Database Configuration
mongoose
  .connect(connectionString, {
    dbName: dbName,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Run server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running");
});

swaggerDocs(app, port);