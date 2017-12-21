var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    var fileData = data.toString('utf-8');
    var sites = fileData.split('\n');
    sites.pop();
    callback(sites);
  });
};


exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(data => {
    if (data.includes(url)) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(file, url) {
  url = url + '\n';
  fs.appendFile(file, url);
};

exports.isUrlArchived = function(url, callback) {
  if (fs.existsSync(exports.paths.archivedSites + '/' + url)) {
    callback(true);
  } else {
    callback(false);
  }
};

exports.downloadUrls = function(urls) {
  urls.forEach(url => {
    request('http://' + url, (error, response, body) => {
      // console.log('error:', error);
      // console.log('statusCode:', response && response.statusCode);
      // console.log('body:', body);
      fs.writeFile(exports.paths.archivedSites + '/' + url, body, (err) => {
      });
    });
  });
};






