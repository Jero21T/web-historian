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

exports.checkReady = (res, url, boolean) => {
  if (boolean) {
    archive.isUrlArchived(url, boolean2 => {
      console.log('is url archived? ' + boolean2);
      if (boolean2) {
        exports.serveAssets(archive.paths.archivedSites + '/' + url, (error, data) => {
          console.log(data.toString('utf-8'));
          res.end(data.toString('utf-8'));
        });
      } else {
        exports.serveAssets(__dirname + '/public/loading.html', (error, data) => {
          console.log(data.toString('utf-8'));
          res.end(data.toString('utf-8'));
        });
      }
    });
  } else {
    archive.addUrlToList(archive.paths.list, url);
    exports.serveAssets(__dirname + '/public/loading.html', (error, data) => {
      console.log(data.toString('utf-8'));
      res.end(data.toString('utf-8'));
    });
  }
};