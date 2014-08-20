var ucss = require('ucss');
var cheerio = require('cheerio');
var Promise = require('promise');
var request = require('request');
var url = require('url');

var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.render('index', {});
});

app.get('/api/cssr', function (req, res) {

  var promises = [];

  function cssPathes (htmlPath) {
    return new Promise(function (resolve, reject) {

      var result = {
        html: htmlPath,
        css: []
      };

      request(htmlPath, function (error, response) {
        if (!error && response.statusCode === 200) {
          try {
            var $  = cheerio.load(response.body);
            var $link = $('link[rel=stylesheet]');

            $link.each(function () {
              result.css.push(url.resolve(htmlPath, $(this).attr('href')));
            });

            resolve(result);
          } catch (e) {
            reject(e);
          }
        } else if (!error) {
          reject('Status code is ' + response.statusCode);
        } else {
          reject(error);
        }
      });
    });
  }

  if (req.query.url) {
    promises.push(cssPathes(req.query.url));

    Promise.all(promises).done(function (results) {
      results.forEach(function (result) {

        var html = {
          crawl: result.html,
          include: null,
          exclude: null
        };
        var css = result.css;
        var context = {
          whitelist: [],
          auth: null
        };

        ucss.analyze(html, css, context, null, function (data) {
          res.json(data);
        });
      });
    }, function (error) {
      console.log(error);
    });
  }
});

app.listen(process.env.PORT || 9841);
