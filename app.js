var createError = require('http-errors');
var express = require('express');
var ejs = require('ejs')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//在express中加载webpack模块
var webpack = require('webpack');
//webpack的配置文件
var webpackConfig = require('./webpack.config.js');
//启动webpack的方法webpack(配置文件对象，回调)
var compiler = webpack(webpackConfig,function(err,stats){
    //我们可以在stats中看到webpack打包的过程与命令行执行的结果是一样的
    console.log(stats.toString({
        colors:true
    }));
    //通过compiler对象可以开启watch模式来监听原文件的变化，如果原文件发生改变就会
    //出发webpack的重新打包回调函数内部与打包函数是一样的
    compiler.watch({
        aggregateTimeout: 300,
        poll: undefined
    },function(err,stats){})
});


// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
