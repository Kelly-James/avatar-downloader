var request = require('request');
var http = require('http');
var fs = require('fs');


// require('dotenv').config();
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
console.log(options);
console.log('user: ' + user);
console.log('repo: ' + repo);


function getRepoContributors() {
  request(options, function(error, response, body) {
    var user = '';
    var avaUrl = '';
    if (!error && response.statusCode == 200) {
      for(var value of body) {
        user = value.login + '.png';
        avaUrl = value.avatar_url;
        downloadImageByURL(avaUrl, user);
      }
    }
    console.log(user);
    console.log(avaUrl);
  });
}

function downloadImageByURL(url, filepath) {
  // console.log(url);
  // console.log('avatars/' + filepath);
  request(url).pipe(fs.createWriteStream(repo + '/' + filepath));
}

fs.mkdir(repo, function() {
  getRepoContributors();
});



  // for(var cont of body) {
  //   console.log(cont);
  // }
  // console.log(body);

  // var magic_array = [
  //   {name: 'ggrochow', url: 'https://avatars.githubusercontent.com/u/11564146?v=3'},
  // ]





 //  var data = url;
 //  writerStream.end();
 //  writerStream.on('finish', function() {
 //    console.log('Write Completed');
 //  });
 //  writerStream.on('error', function(err) {
 //    console.log(err.stack);
 //  });
 // console.log('Program Ended');

// function getRepoContributors(repoOwner, repoName, dealWithContributors) {
//   var token = 0e7db6124dcaab4eedb3ea195007487183c3b6f3;
//   var contributors = [];
//   dealWithContributors(contributors);
//   return contributors;
// }

// function getURLData(url, request) {
//   request(url, function(error, res, body) {
//     if (error) {
//       return
//     }
//     request(body);
//   });
// }

// function downloadImageByURL(url, filePath) {

// }

// console.log(contributors);


