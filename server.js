const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { InternalModel, ExternalModel } = require('./schemas/marks');
const registermodule = require('./schemas/register');
const bodyParser = require('body-parser');
const session = require("express-session");
const jwt = require('jsonwebtoken');
const registermodel = require('./schemas/register');
const resultRoute = require('./routes/results')
const coeroute = require('./routes/coe.js')
const connectDB = require('./db'); // Import the database connection
const connectToDatabase = require("./db");
connectToDatabase();





app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/results",resultRoute);
app.use("/Coe",coeroute);

app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});


app.post('/signup', (req, res) => {
  registermodule.create(req.body)
    .then(registermodule => res.json())
    .catch(err => res.json(err))

})


// Add this router to your main app




app.post('/Signin', async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await registermodel.findOne({ email, password });

    if (!user) {
      console.log('user not found', email, password)
      return res.status(404).json({ status: 'User not found', message: 'User not found' });
    }


    if (user.password === password) {
      return res.status(200).json({
        status: 'success',
        message: 'Login successful. Redirecting to dashboard...',
        userDetails: {
          email: user.email,
        },
      });
    } else {
      return res.status(401).json({ status: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Internal Server Error', message: 'Internal Server Error' });
  }
});

app.get("/api/dashboard", async (req, res) => {
  try {
    // Fetch user data based on the user's email
    const userId = req.query.email; // Assuming the email is passed as a query parameter
    const userData = await registermodule.findOne({ email: userId });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send relevant user data to the frontend
    res.json({
      userId: userData._id,
      email: userData.email,
      name: userData.name,
      // Add more fields as needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Add a new route to get the roll number based on the user's email



app.get("/StudentResult/:rollNumber", async (req, res) => {
  try {
    const rollNumber = req.params.rollNumber;
    const [internalData, externalData] = await Promise.all([
      InternalModel.findOne({ _id: rollNumber }),
      ExternalModel.findOne({ _id: rollNumber }),
    ]);

    if (!internalData || !externalData) {
      return res.status(404).send({ error: "No marks found" });
    }

    const internalMarks = internalData.marks;
    const externalMarks = externalData.marks;
    const name = internalData.name;
    const id = internalData._id;

    const totalMarks = internalMarks + externalMarks;

    const response = {
      id,
      name,
      internalMarks,
      externalMarks,
      totalMarks,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});





app.listen(5001, () => {
  console.log("Server started on port 5001");
});
