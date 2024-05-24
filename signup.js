const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const registermodule = require('./register')
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000", // Allow requests from this origin
        credentials: true, // Allow cookies to be sent with requests
    })
);


app.post('/signup', (req, res) => {
    registermodel.create(req.body)
        .then(register => res.json())
        .catch(err =>res.json(err))

})