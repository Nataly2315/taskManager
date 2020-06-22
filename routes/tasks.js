const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();
const moment = require('moment')
const { bot } = require("../telegramAPI/telegram");

router.get('/', async function (req, res, next) {
  let query = {};
  if (req.query.filter === "author") {
    query = {
      author: req.user.id
    }
  }
  if (req.query.filter === "executor") {
    query = {
      executor: req.user.ObjectId
    }
  }
  let a = await Task.find(query);
  res.send(a)
});


router.post('/', async function (req, res, next) {
  const user = await User.findOne({ openId: req.user.id });
  const query = req.body;
  query.author = user._id;
  query.status = "New";
  query.time = null;
  query.comment = null;
  const task = await Task.create(query);
  const executor = await User.findById(query.executor);
  if (executor.chatId) {
  bot.telegram.sendMessage(user.chatId, `You have new task ${query.title}.`);
}
  res.send(task)
});


router.put('/:taskId', async function (req, res, next) {
  try {
  const query = req.body;
  query.time = moment(Date.now()).format('DD/MM/YYYY HH:mm:ss');
  const task = await Task.findByIdAndUpdate(req.params.taskId, query, {new: true});
  let user={};
  if (["Done","Rejected"].includes(query.status)) {
    user = await User.findById(task.author);
  }
  if (["Confirmed","Returned"].includes(query.status)){
    user = await User.findById(task.author);
  }
  else {
    throw new Error ('Wrong status')
  }
  if (user && user.chatId) {
    bot.telegram.sendMessage(user.chatId, `Your task ${task.title} was ${query.status}.`)
  }
  res.send(task)}
  catch (e) {
    res.status(400).send(e);
  }
});


module.exports = router;
