var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var self = this;

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.sendResponse = (res, data, statusCode) => {
  res.writeHead(statusCode, self.headers);
  res.end(data);
};

exports.serveAssets = (asset, callback) => {
  fs.readFile(asset, (err, data) => {
    callback(err, data);
  });
};