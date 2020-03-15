const createError = require('http-errors');
const express = require('express');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport');
const passportInit = require('./passport');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.pretty = true;

// session관리
app.use(cookieParser(process.env.cookieSalt));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.cookieSalt,
	cookie: {
		httpOnly: true,
		secure: false,
	}
}));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// passport 설정
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
