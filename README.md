# Goal
This is a Github webhook.
The aim is to enforce a specific reviewer for every PR containing Front-end (.js, .jsx, .css, .html, etc.)

# Run it

`export GITHUB_TOKEN=XXXXXXX && npm run start` launches an express server on localhost:4567.

# Auth Github
It uses the process.env.GITHUB_TOKEN for authentication.

# Github setting
In the _webhooks_ setting page, add new webhook, and put the URL of your webhook server + **/payload**
ie: `http://my-webhook-server-host:4567/payload`

# Want to contribute ? 

- [ ] Add ability to configure the reviewer(s). 
- [ ] Add abitity to configure host/port
- [ ] Add ability to configure matching extension(or any kind of regexp)
- [ ] Add ability to add multiple reviewers for different matchings
