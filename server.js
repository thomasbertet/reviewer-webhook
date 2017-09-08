#!/usr/bin/env node

var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var path = require('path')
var axios = require('axios');

//Const
var port = "4567";
var host = "localhost";

const TOKEN = process.env.GITHUB_TOKEN;

axios.defaults.headers.common['Authorization'] = 'token ' + TOKEN;

const watchedPrActions = ['opened', 'synchronize'];
const extWatched = ['.js', '.jsx', '.html', '.css', '.scss', '.json', '.eslintrc', '.babelrc'];

function addReviewer(url) {
    const reviewRequestUrl = url + '/requested_reviewers';

    return axios.post(reviewRequestUrl, {reviewers: ['thomasbertet']}).then(function(res) {
        console.log('added request review');
    }).catch(function(error) {
        console.log('Error RequestReview: ', error);
    })
}

function getFiles(url) {
    const filesUrl = url + '/files';

    return axios.get(filesUrl).then(function(res) {
        return res.data.map(commit => commit.filename);
    }).catch(function(error) {
        console.log('Error: ', error);
    })
}

function shouldReact(filenames) {
    for (let filename of filenames) {
        const extension = path.extname(filename);
        if (extWatched.indexOf(path.extname(filename)) >= 0) {
            return true;
        }
    }

    return false;
}

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

  var command = req.headers["x-github-event"];
  const body = req.body;

  switch(command) {
    case "pull_request":
        const prUrl = body['pull_request'].url;
        if (watchedPrActions.indexOf(body.action) >= 0) {
            console.log("PR ", prUrl, 'action: ' + body.action);
            res.send("PROCESSING OK FOR" + body['pull_request'].number);
            // Get files
            getFiles(prUrl)
                .then((filenames) => {
                    if (shouldReact(filenames)) {
                        console.log('add reviewer');
                        addReviewer(prUrl);
                    } else {
                        console.log('should not react', filenames);
                    }
                });
        } else {
            res.send("NOT PROCESSED : " + body['pull_request'].number);
        }
      break;
    default:
  }
});

