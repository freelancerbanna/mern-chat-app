require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const { readdirSync } = require("fs");
const app = express();

//
const { DB, PORT } = require("./env");
const passportSetup = require("./passport");

// server middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "DELETE", "UPDATE", "POST"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["kothabarta"],
    maxAge: 24 * 60 * 60 * 200,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// listening all routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// database and port connetion
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server and Database successfully working with port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
