
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
, Name = require('./lib/names.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	Name.getList(function(err, names){
		if (err) {
			console.log(err);
		} else {
			res.render('index', { namesList: names, title: 'Mongonode-app Sample'});
		}
	});
});


app.post('/add', function(req, res){
	Name.addName(req.body.name, function(err){
		if (err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
