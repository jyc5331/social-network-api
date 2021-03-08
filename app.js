const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

//will the following line be sufficient or will they all need to be imported? TBD
const { Users } = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/usersdb", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
