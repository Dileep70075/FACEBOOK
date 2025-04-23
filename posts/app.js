var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoDB = require('./database/user.database');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); 
const customerRouter = require('./routes/customer.route');
const postRouter = require('./routes/post.route');
const requestRouter = require('./routes/requests.route');
const likecommentRouter = require('./routes/likeComment.route');
var app = express();
const cors = require('cors');
mongoDB();
// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
const bodyParser = require('body-parser');
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Enable Access-Control-Allow-Credentials
};
// Middleware
app.use(cors(corsOptions)); // Enable CORS with options
app.use(bodyParser.json());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customer', customerRouter);
app.use('/post', postRouter);
app.use('/request', requestRouter);
app.use('/likecomment', likecommentRouter);

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
