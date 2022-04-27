const cors = require("cors");

const express = require("express");

const bodyParser = require("body-parser");

const passport = require("passport");

const { PORT } = require("./src/config/index");
const port = PORT || 3000;
const connectDB = require("./src/config/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());

require("./src/middlewares/passport")(passport);

app.use("/user", require("./src/controllers/user_controller"));
app.use("/pet-place", require("./src/controllers/pet_place_controller"));

app.use("/pet", require("./src/controllers/pet_controller"));

app.listen(port, () => {
  console.log("listening");
  connectDB();
});
