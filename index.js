const ucss = require('ucss');
const cheerio = require('cheerio');
const got = require('got');
const url = require('url');
const express = require('express');
const app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/webcomponents', express.static(__dirname + '/public/webcomponents'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('/api/cssr', (req, res) => {
  const htmlUrls = [];
  const cssUrls = [];
  const htmlStrings = [];
  const cssStrings = [];

  if (req.query.url) {
    got(req.query.url).then(response => {
      htmlUrls.push(req.query.url);
      htmlStrings.push(response.body);
      const urls = [];

      try {
        const $ = cheerio.load(response.body);
        $('link[rel=stylesheet]').each((index, $link) => {
          urls.push(url.resolve(req.query.url, $link.attribs.href));
        });
      } catch (error) {
        console.error(error);
      }

      return urls;
    }).then(urls => {
      return Promise.all(urls.map(url => got(url).then(response => {
        cssUrls.push(url);
        cssStrings.push(response.body);
      })));
    }).then(results => {
      ucss.analyze({
        include: htmlStrings.join('')
      }, cssStrings.join(''), null, null, data => {
        res.json({
          htmlUrls: htmlUrls,
          cssUrls: cssUrls,
          result: data
        });
      });
    }).catch(error => {
      console.error(error);
    });
  }
});

app.listen(process.env.PORT || 9841);
