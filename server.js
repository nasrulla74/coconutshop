const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bookings = require("./routes/api/booking");

const app = express();

//Body parser moddleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Congfig
const db = require("./config/keys").mongoURI;

// connect mongoDB
mongoose
  .connect(db)
  .then(() => console.log("mongo db connected"))
  .catch(err => console.log(err));

// possport midleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// user Routs
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/bookings", bookings);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
