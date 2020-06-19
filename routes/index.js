const express = require('express');
const router = express.Router();
const request = require('request');
const queryString = require('query-string');

const passport = require('passport');

const stringifiedParams = queryString.stringify({
    client_id: '1026671969530-ag5mrsthqeoe7lc7sil1mdm3ep1pavr6.apps.googleusercontent.com',
    redirect_uri:'http://localhost:300/authenticate/google',
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    include_granted_scopes:true,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
});

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

const getGoogleToken = async (code) => {
    console.log(code);
    const data = await request(`https://oauth2.googleapis.com/token`, {
        method: 'post',
        data: {
            client_id: "1026671969530-ag5mrsthqeoe7lc7sil1mdm3ep1pavr6.apps.googleusercontent.com",
            client_secret: "cmYC62UIqb1WDqnUe2mgdFsA",
            redirect_uri: 'http://localhost:300',
            grant_type: 'authorization_code',
            code,
        }}, (data)=>{ return data})
};




/* GET home page. */

router.get('/authenticate/google', async function (req, res, next) {
    const code = req.query.code;
    const token = await getGoogleToken(code);
    console.log(token);
    res.render('index', {title: 'Express'});
});


router.post('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});



router.get('/login', async function (req, res, next) {
    console.log(googleLoginUrl);
    console.log(await getConnectionUrl());

             res.redirect(googleLoginUrl);

})

// Example protected and unprotected routes

router.get('/', (req, res) => res.send('Example Home page!'))
router.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', isLoggedIn, (req, res) =>{  this.app.bot.telegram.sendMessage("344101336", "cool");
res.send(`Welcome mr ${req.user.displayName}!`)
   })

// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {

        // Successful authentication, redirect home.
        res.redirect('/good');
    }
);

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


module.exports = router;
