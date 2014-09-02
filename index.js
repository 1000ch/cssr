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

  var html = [];
  var css = [];

  if (req.query.url) {

    var promise = new Promise(function (resolve, reject) {
      request(req.query.url, function (error, response) {
        if (!error && response.statusCode === 200) {
          try {
            html.push(response.body);
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

      return new Promise(function(resolve, reject) {
        async.each(urls, function (url, callback) {
          request(url, function (error, response) {
            if (!error && response.statusCode === 200) {
              css.push(response.body);
              callback();
            } else {
              callback(error);
            }
          });
        }, function (error, results) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

    }).then(function () {

      var pages = {
        include: html.join('')
      };

      ucss.analyze(pages, css.join(''), null, null, function (data) {
        res.json(data);
      });

    }).catch(function (error) {
      console.log(error);
    });
  }
});

app.listen(process.env.PORT || 9841);