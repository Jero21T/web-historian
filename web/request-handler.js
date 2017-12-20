var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

var requestMethods = {
  "GET": function(req, res) {
    fs.readFile(__dirname + '/public/index.html', 'utf-8', function(err, data) {
      if (err) {
        console.log('error ' + err)
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data)
      }
    })
  }

}

exports.handleRequest = function (req, res) {
  if(requestMethods[req.method]) {
    requestMethods[req.method](req, res);
  }

};