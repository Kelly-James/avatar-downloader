// AVATAR DOWNLOADER

// state modules,
var request = require('request');
var http = require('http');
var fs = require('fs');

// set variables, awaiting input from terminal,
// state options for url request,
var user = process.argv[2];
var repo = process.argv[3];
var contributors = process.argv[4];
var options = {
  url: 'https://api.github.com/repos/' + user + '/' + repo + '/' + contributors,
  headers: {
    "User-Agent":"request"
  },
  json: true,
}

// make request to url,
// loop through returned object,
// pull login name and avatar url,
// call writeImage function,
function getRepoContributors() {
  request(options, function(error, response, body) {
    var user = '';
    var avaUrl = '';
    if (!error && response.statusCode == 200) {
      for(var value of body) {
        user = value.login + '.png';
        avaUrl = value.avatar_url;
        writeImage(avaUrl, user);
      }
    }
  });
}

// write info to disk,
function writeImage(url, filepath) {
  request(url).pipe(fs.createWriteStream(repo + '/' + filepath));
}

// create directory,
// call getRepoContributors function,
fs.mkdir(repo, function() {
  getRepoContributors();
});


