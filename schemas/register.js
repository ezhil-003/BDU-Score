const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Your routes and other middleware go here

const registerschema = new mongoose.Schema({
    _id:String,
    email: String,
    name: String,
    password: String,
});

const registermodel = mongoose.model("userregister", registerschema);
module.exports = registermodel;

/*app.listen(5000, () => {
  console.log("Server started on port 5000");
});*/

