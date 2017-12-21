var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var helpers = require('./http-helpers');
// require more modules/folders here!

var requestMethods = {
  'GET': function(req, res) {
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
        console.log('is url in list? ' + boolean);
        if (boolean) {
          archive.isUrlArchived(url, boolean2 => {
            console.log('is url archived? ' + boolean2);
            if (boolean2) {
              helpers.serveAssets(archive.paths.archivedSites + '/' + url, (error, data) => {
                if (error) { throw error; }
                console.log(data.toString('utf-8'));
                res.end(data.toString('utf-8'));
              });
            } else {
              helpers.serveAssets(__dirname + '/public/loading.html', (error, data) => {
                console.log(data.toString('utf-8'));
                res.end(data.toString('utf-8'));
              });
            }
          });
        } else {
          archive.addUrlToList(archive.paths.list, url);
          helpers.serveAssets(__dirname + '/public/loading.html', (error, data) => {
            console.log(data.toString('utf-8'));
            res.end(data.toString('utf-8'));
          });
        }
      //   if (boolean) {
      //     helpers.serveAssets(archive.paths.archivedSites + '/' + url, (error, data) => {
      //       if (error) { throw error; }
      //       console.log(data.toString('utf-8'));
      //       res.end(data.toString('utf-8'));
      //     });
      //   } else {
      //     archive.addUrlToList(archive.paths.list, url);
      //     helpers.serveAssets(__dirname + '/public/loading.html', (error, data) => {
      //       console.log(data.toString('utf-8'));
      //       res.end(data.toString('utf-8'));
      //     });
      //   }
      // });
          //find the right path in archive and retrieve html
          //test #3 won't pass until implemented
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  if (requestMethods[req.method]) {
    requestMethods[req.method](req, res);
  }
  // res.end();
};