var http = require('http'),
	fitrackers = require('./data'),
	db = require('./db'),
	app = require('./app')(fitrackers, db);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
