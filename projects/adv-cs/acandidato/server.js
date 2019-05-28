var express = require('express');
var logger = require('morgan');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.get('/', function(request, response){
	response.render("home.ejs");
})
var port = process.env.PORT || 8080;
app.listen(port, function(){
	console.log("running on: " + port);
})