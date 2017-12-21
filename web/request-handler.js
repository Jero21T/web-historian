var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var helpers = require('./http-helpers');
// require more modules/folders here!

var requestMethods = {
  'GET': function(req, res) {
    if (req.url === '/' || req.url === '') {
      helpers.serveAssets(__dirname + '/public/index.html', data => { res.end(data); });
    } else {
      helpers.sendResponse(res, req.url + 'not found', 404, null);
    }
  },

  'POST': function(req, res) {
    req.on('data', (data) => {
      var url = data.toString('utf-8').substring(4);

      archive.isUrlInList(url, boolean => {
        //check if url exists
        if (boolean) {
          //true -> don't add to list
        } else {
          archive.addUrlToList(archive.paths.list, url);
        }
      });
          //find the right path in archive and retrieve html
          //test #3 won't pass until implemented
        // res.end();
    });
  },
};

exports.handleRequest = function (req, res) {
  if (requestMethods[req.method]) {
    requestMethods[req.method](req, res);
  }
  // res.end();
};