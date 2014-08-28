var ucss = require('ucss');
var cheerio = require('cheerio');
var Promise = require('promise');
var request = require('request');
var async = require('async');
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

  if (req.query.url) {

    var promise = new Promise(function (resolve, reject) {
      request(req.query.url, function (error, response) {
        if (!error && response.statusCode === 200) {
          try {
            var $  = cheerio.load(response.body);
            var $link = $('link[rel=stylesheet]');
            var urls = [];

            $link.each(function () {
              urls.push(url.resolve(req.query.url, $(this).attr('href')));
            });

            resolve(urls);
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

    promise.then(function onFulfilled(urls) {

      var html = [req.query.url];
      var css = urls;

      var pages = {
        crawl: html
      };

      var context = {
        whitelist: [],
        auth: null
      };

      ucss.analyze(pages, css, context, null, function (data) {
        res.json(data);
      });

    }).catch(function (error) {
      console.log(error);
    });
  }
});

app.listen(process.env.PORT || 9841);
