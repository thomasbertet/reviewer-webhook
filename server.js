#!/usr/bin/env node

var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var path = require('path')
// var xhub = require("express-x-hub")

//Const
var xhubSecret = "";
var port = "4567";
var host = "localhost";

const watchedFilesGroup = ['modified', 'added'];
const extWatched = ['.js', '.jsx', '.html', '.css', '.scss', '.json', '.eslintrc', '.babelrc'];

//Secret key
// app.use(xhub({ algorithm: "sha1", secret: xhubSecret }));

// Configure express json
app.use(bodyParser.json());

// Main : Start the express http server
var server = app.listen(port, host, function () {
  console.log(
    "App listening at http://%s:%s",
    server.address().address,
    server.address().port
  )
});

// Add default route
app.post("/payload", function (req, res) {
/*  if(!req.isXHubValid()){
    res.status(400).send('Invalid X-Hub Request');
    console.log("Secret key is invalid");
    return
  }*/

  var command = req.headers["x-github-event"];

  switch(command) {

    case "pullrequest":
      res.send("Event pullrequest trigger");
      console.log("Create event");
      break;

      case "push":
      res.send("Event push trigger");

      var commits = Array.isArray(req.body.commits) ? req.body.commits : [];

      var shouldReact = false;

      commits.forEach(function (commit) {
        console.log('added', commit.added);
          watchedFilesGroup.forEach(function(group) {
            var files = commit[group];

            files.forEach(function(filename) {
              if (extWatched.indexOf(path.extname(filename)) >= 0) {
                shouldReact = true;
                console.log('matched', filename);
              }
            });
          });
      });

      console.log("push Event");
      break;

    default:
      res.status(400).send("Event not supported : " + command);
      console.log("Event not supported : " + command);
  }
});

