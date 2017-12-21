var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var helpers = require('./http-helpers');
// require more modules/folders here!

var requestMethods = {
  'GET': function(req, res) {
    if (req.url === '/' || req.url === '') {
      helpers.serveAssets(__dirname + '/public/index.html', data => { res.end(data); });
    } else if (req.url.is.archived.file) {
      
    } else {
      helpers.sendResponse(res, req.url + 'not found', 404, null);
    }
  },
  //   fs.readFile(__dirname + '/public/index.html', 'utf-8', function(err, data) {
  //     if (err) {
  //       res.writeHead(404);
  //       console.log('error ' + err);
  //     } else {
  //       res.writeHead(200, {'Content-Type': 'text/html'});
  //       res.end(data);
  //     }
  //   });
  // },
  'POST': function(req, res) {
    archive.readListOfUrls();
    req.on('data', (data) => {
      var url = data.toString('utf-8').substring(4);
      fs.appendFile(archive.paths.list, url + '\n', (err, data) => {
        if (err) { throw err; }        
        console.log(`${url} was appended to file!`);
        res.writeHead(302);
          //find the right path in archive and retrieve html
          //test #3 won't pass until implemented
        // res.end();
      });
    });
  },
};

exports.handleRequest = function (req, res) {
  if (requestMethods[req.method]) {
    requestMethods[req.method](req, res);
  }
  res.end();
};