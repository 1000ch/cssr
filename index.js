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

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/webcomponents', express.static(__dirname + '/public/webcomponents'));

app.get('/', function(request, response){
  response.render('index', {});
});

app.get('/api/cssr', function (req, res) {

  var htmlUrls = [];
  var cssUrls = [];
  var htmlStrings = [];
  var cssStrings = [];

  if (req.query.url) {

    var promise = new Promise(function (resolve, reject) {
      request(req.query.url, function (error, response) {
        if (!error && response.statusCode === 200) {
          try {
            htmlUrls.push(req.query.url);
            htmlStrings.push(response.body);
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
              cssUrls.push(url);
              cssStrings.push(response.body);
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
        include: htmlStrings.join('')
      };

      ucss.analyze(pages, cssStrings.join(''), null, null, function (data) {
        res.json({
          htmlUrls: htmlUrls,
          cssUrls: cssUrls,
          result: data
        });
      });

    }).catch(function (error) {
      console.log(error);
    });
  }
});

app.listen(process.env.PORT || 9841);