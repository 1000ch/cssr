var ucss = require('ucss');
var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.render('index', {});
});

app.get('/api/cssr', function (request, response) {
  console.log(request.params);
  console.log(request.query);

  if (request.query.url) {
    var urls = [request.query.url];
  }
  response.json({
    foo: 'bar'
  });
});

app.listen(process.env.PORT || 3000);
