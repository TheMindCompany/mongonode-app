
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

var Name = require('./lib/names.js');

var mongo = require('mongodb')
  , config = require('./config/config.js');

var db = new mongo.Server(config.mongo_host, config.mongo_port, {});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	Name.nameList(function(names, err){
		if (err) {
			console.log(err);
		} else {
			res.render('index', { nameList: names, title: 'MongoDB Sample App' });
		}	
	});
});
app.post('/add', function(req, res) {
	Name.addName(req.body.name, function(err){
		if (err) {
			console.log(err);
		} else {
			console.log('Added name: ' + req.body.name);
			res.redirect('/');
		}
	});
});

http.createServer(app).listen(config.listen_port);
