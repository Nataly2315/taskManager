const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const jwt = require("jsonwebtoken");

let mockedUsername = 'admin';
let mockedPassword = 'password';
let secret = 'secret';

const checkToken = (req, res, next) => {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
      
        if (token) {
          jwt.verify(token, secret, (err, decoded) => {
            if (err) {
              return res.json({
                success: false,
                message: 'Token is not valid'
              });
            } else {
              req.decoded = decoded;
              next();
            }
          });
        } else {
          return res.json({
            success: false,
            message: 'Auth token is not supplied'
          });
        }
      };

router.post('/login', function (req, res, next) {
      let username = req.body.username;
      let password = req.body.password;

 

try{
      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
          let token = jwt.sign({username: username},
           secret,
            { expiresIn: '24h' // expires in 24 hours
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.send(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
    catch(e){
        throw Error(e);
    }})

router.get('/task', checkToken, async function(req, res, next) {
    let query={};
    if (req.query.filter === "author"){
    query = {
    author: req.query.userId 
      }
    }
    if (req.query.filter === "executor"){
      query={
        executor: req.query.userId 
    }
      }
  
   let a = await Task.find(query);
   res.send(a)
  }
)


    module.exports = router;