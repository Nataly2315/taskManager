const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require('../models/User');


passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});
console.log(process.env.PORT);

passport.use(new GoogleStrategy({
        clientID: "1026671969530-ag5mrsthqeoe7lc7sil1mdm3ep1pavr6.apps.googleusercontent.com",
        clientSecret: "cmYC62UIqb1WDqnUe2mgdFsA",
        callbackURL: `http://localhost/google/callback`
    },
 async  function(accessToken, refreshToken, profile, done) {
    const isExist = await user.findOne({ openId: profile.id  });
    if (!isExist) {
    await user.create({ openId: profile.id, username: profile.displayName, email: profile._json.email});
    }
    

        /*
         use the profile info (mainly profile id) to check if the user is registerd in ur db
         If yes select the user and pass him to the done callback
         If not create the user and then select him and pass to callback
        */
        return done(null, profile);
    }
));
