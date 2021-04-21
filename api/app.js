var fs = require('fs');
var util = require('util');
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let morgan = require('morgan');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let config = require('config');
let mongoose = require('mongoose');
let app = express();
let cors = require('cors');

async function connectDB() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('DB - success');
	} catch (e) {
		console.log('Server Error : onStart()', e.message);
		process.exit(1);
	}
}
connectDB();

app.use(cors());

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', function (req, res) {
	res.send('Page under construction.');
});

app.all('/', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});

// Using routes
let authentication = require('./routes/auth');
app.use('/api', authentication);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

//

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(err.message);
});

// prod setup
if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, '../client', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
	});
}

module.exports = app;
