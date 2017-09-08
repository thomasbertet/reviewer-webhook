# reviewer-webhook
Add me as reviewer for each PR containing Front-end (.js, .jsx, .css, .html, etc.)

This is a Github webhook.

# Run it

`export GITHUB_TOKEN=XXXXXXX && npm run start` launches an express server on localhost:4567.

# Auth Github
It uses the process.env.GITHUB_TOKEN for authentication.

# Want to contribute ? 

- [ ] Add ability to configure the reviewer(s). 
- [ ] Add abitity to configure host/port
- [ ] Add ability to configure matching extension(or any kind of regexp)
- [ ] Add ability to add multiple reviewers for different matchings
