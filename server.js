var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cros = require('cors');
var proxy = require('http-proxy-middleware');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(cros());
app.use('/name', proxy({target:'http://meanstack-todo.herokuapp.com/api', changeOrigin:true,proxyTimeout:100000}));

app.use(function(req,res,next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
	
});

app.use(express.static('www'));
app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'),function(){
	console.log('Express server listening on port ' + app.get('port'));
});
