const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mtech', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
