const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const config = require('config');

var api = require('instagram-node').instagram();

var app = express();

var redirect_uri = `${config.get('domain')}/auth/ig`;

api.use({
  client_id: config.get('clientId'),
  client_secret: config.get('clientSecret'),
});

// This is where you would initially send users to authorize
app.get('/login/ig', function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri));
});

// This is your redirect URI
app.get('/auth/ig', function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.redirect(`${config.get('domain')}?login=ig&err=${err.body}`);
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.redirect(`${config.get('domain')}?login=ig&token=${result.access_token}`);
    }
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/privacy', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/privacy.html'));
});

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

const port = config.get('port');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
