const express = require("express")
const app = express()
const mongoose = require("mongoose");
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const { Semester, Subject } = require('../schemas/Subjects')
const registermodel = require('../schemas/register.js');
const Token = require('../schemas/token.js')


const jwtSecret = "qwertyuiop";
const jwtExpiresIn ="24h";

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(403).json({ status: 'Forbidden', message: 'No token provided' });
    }
  
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(500).json({ status: 'Failed to authenticate token', message: 'Failed to authenticate token' });
      }
      
      // Save the decoded token to request object for use in other routes
      req.userId = decoded.userId;
      next();
    });
  };

router.post('/Coe/Coelogin', async (req,res) => {
    try{
      const { email, password } = req.body;
      const user = await registermodel.findOne({ email, password });
  
      if (!user) {
        console.log('user not found', email, password)
        return res.status(404).json({ status: 'User not found', message: 'User not found' });
      }
      console.log("exxexcuted")
      const token = jwt.sign( {email: user.email }, jwtSecret, { expiresIn: jwtExpiresIn });
      const tokenDocument = new Token({ token, email});
      console.log(tokenDocument)
      await tokenDocument.save();
      if (user.password === password) {
        return res.status(200).json({
          status: 'success',
          message: 'Login successful. Redirecting to dashboard...',
          token:token,
          userDetails: {
            email: user.email,
            name: user.name,     
          },
        });
        
        
      } else {
        return res.status(401).json({ status: 'Invalid credentials' });
      }
  
    }catch (error){
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });

module.exports = router;