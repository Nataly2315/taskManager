const express = require('express');
const router = express.Router();
const request = require('request');
const queryString = require('query-string');

const stringifiedParams = queryString.stringify({
    client_id: "1026671969530-ag5mrsthqeoe7lc7sil1mdm3ep1pavr6.apps.googleusercontent.com",
    redirect_uri: 'http://localhost:3000/authenticate/google',
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
});

const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

const getGoogleToken = async (code) => {
    const data = await request(`https://oauth2.googleapis.com/token`, {
        method: 'post',
        data: {
            client_id: "1026671969530-ag5mrsthqeoe7lc7sil1mdm3ep1pavr6.apps.googleusercontent.com",
            client_secret: "cmYC62UIqb1WDqnUe2mgdFsA",
            redirect_uri: 'https://www.example.com/authenticate/google',
            grant_type: 'authorization_code',
            code,
        },
    });
    console.log(data); // { access_token, expires_in, token_type, refresh_token }
    return data.access_token;
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/authenticate/google', async function (req, res, next) {
    const code = req.query.code;
    const token = await getGoogleToken(code);
    console.log(token);
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.redirect(googleLoginUrl);
});

module.exports = router;
