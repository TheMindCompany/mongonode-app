
/*
 * GET home page.
 */
var names = {{name: 'bob'},
	     {name: 'brandon'}};
exports.index = function(req, res){
  res.render('index', { nameList: names, title: 'Express' });
};
