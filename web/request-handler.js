var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var helpers = require('./http-helpers');
// require more modules/folders here!

var requestMethods = {
  'GET': (req, res) => {
    if (req.url === '/' || req.url === '') {
      helpers.serveAssets(__dirname + '/public/index.html', (error, data) => { res.end(data); });
    } else {
      helpers.sendResponse(res, req.url + 'not found', 404, null);
    }
  },

  'POST': function(req, res) {
    req.on('data', (data) => {
      var url = data.toString('utf-8').substring(4);
      archive.isUrlInList(url, boolean => {
        helpers.checkReady(res, url, boolean);
      });
    });
  }
};

exports.handleRequest = (req, res) => {
  if (requestMethods[req.method]) {
    requestMethods[req.method](req, res);
  }
};
