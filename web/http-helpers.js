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
  callback(fs.readFileSync(asset));
};



// As you progress, keep thinking about what helper functions you can put here!
