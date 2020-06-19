const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const cors = require('cors');
const passport = require('passport');

const { Telegraf } = require('telegraf');

const bot = new Telegraf('825758597:AAG2QQPDGbq4MR6gjayPJc6e71bvNeEnrSg');

require('./googleOAuth/authenticating-users');


const app = express();

const mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


async function initmongo() {
    try {
        let a = await mongoose.connect("mongodb+srv://Admin:1kRAaBVZypQ78ckJ@cluster0-hhboy.mongodb.net/Users?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,

        });
        console.log(a);
    } catch (e) {
        console.error(e);
    }
};

let id="344101336";

bot.start((ctx) => {ctx.reply('Welcome!'), console.log(id=ctx.message.chat.id)});
bot.telegram.sendMessage(id, "cool");
bot.launch();

module.exports


//initmongo();

app.use(logger('dev'));
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(async function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.use(cors());







module.exports = app;

