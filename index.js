var express = require('express');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
	response.render('index', {name: '10000ch'});
});

app.listen(process.env.PORT || 3000);
