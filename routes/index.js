const express = require('express');
const router = express.Router();
const request = require('request');
const {queryString}= require('query-string');

const stringifiedParams = queryString.stringify({
  client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
  redirect_uri: 'http://localhost:3000/authenticate/google',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});
const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/authenticate/google', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.get('/login', function(req, res, next) {
 res.redirect(googleLoginUrl);
})

module.exports = router;
