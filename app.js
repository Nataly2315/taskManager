const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const tasksRouter = require('./routes/tasks');
const apiRouter = require('./routes/api');

const cors = require('cors');
const passport = require('passport');



require('./googleOAuth/authenticating-users');

require('./models/index');
require('./telegramAPI/telegram');

const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



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
app.use('/task', tasksRouter);
app.use('/api', apiRouter);

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
    console.log(err);
    res.status(err.status || 500);
    res.render('error');
});


app.use(cors());



module.exports = app;

