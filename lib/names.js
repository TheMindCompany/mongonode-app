var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var config = require('/opt/mongonode-app/config/config');
	
var NameSchema =  new Schema({
	name: {type: String, lowercase: true, required: true, sparse: true, unique:true}
});

var NameModel = mongoose.model('names', NameSchema);

module.exports.addName = function (name, cb) {
	mongoose.model('names', NameSchema);
	mongoose.connect('mongodb://' + config.mongo_host + ':' + config.mongo_port + '/list');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error: '));
    
	var Name = new NameModel({name: name});
	Name.save(function(err) {
		if (err) {
			cb(err);
		} else {
			cb(null);
		}
		mongoose.disconnect();
	});
};

function getList (cb){
	mongoose.model('names', NameSchema);
	mongoose.connect('mongodb://' + config.mongo_host + ':' + config.mongo_port + '/list');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error: '));
	db.once('open', function () {
        NameModel.find({}, cb);
    });
}

module.exports.nameList = function (cb) {
	getList(function(err, names) {
		mongoose.disconnect();
		if (err) {
			cb(null, err);
			return;
		} else {
			cb(names, null);
			return;
		}
	});
};
