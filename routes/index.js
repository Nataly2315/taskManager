const express = require('express');
const router = express.Router();
const request = require('request');
const Task = require('../models/Task');
const passport = require('passport');
const User = require('../models/User');


const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

/* GET home page. */

router.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/', isLoggedIn, async (req, res) =>{
    const users = await User.find();
    const user = await User.find({openID: req.user.id});
    const createdTaskList = await Task.find({author: user._id}).populate('author');
    const toDoTaskList = await Task.find({executor: user._id}).populate('executor');

    console.log(createdTaskList);
res.render(`../views/index.ejs`, {title:"TaskManager", createdTaskList, toDoTaskList ,users})});


// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


module.exports = router;
