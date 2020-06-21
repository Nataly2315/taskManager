const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();

router.get('/', async function(req, res, next) {
  let query={};
  if (req.query.filter === "author"){
  query = {
  author: req.user.id
    }
  }
  if (req.query.filter === "executor"){
    query={
      executor: req.user.ObjectId
  }
    }
 let a = await Task.find(query);
 res.send(a)
});


router.post('/', async function(req, res, next) {
 let user = await User.findOne({openId: req.user.id});
 let query = req.body;
 query.author= user._id;
 query.staus="New";
 query.time= null;
 query.comment= null;
 console.log(query);
 let a = await Task.create(query);
 res.send(a)
});


router.put('/:taskId', async function(req, res, next) {
  let query = req.body;
  let a = await Task.findByIdAndUpdate(req.params.taskId,query);
  res.send(a)
 });


module.exports = router;
