var archive = require('../helpers/archive-helpers');
var fs = require('fs');


archive.readListOfUrls(data => {
  var toDownload = [];  
  data.forEach((website) => {
    archive.isUrlArchived(website, boolean => {
      if (!boolean) {
        toDownload.push(website);
      }
    });
  });
  archive.downloadUrls(toDownload);
});