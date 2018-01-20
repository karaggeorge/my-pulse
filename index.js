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

app.get('/login/ig', function(req, res) {
  const deepLink = req.query.deepLink;
  console.log('Got deep link ', deepLink);
  res.redirect(api.get_authorization_url(`${redirect_uri}?deepLink=${deepLink}`));
});

app.get('/auth/ig', function(req, res) {
  api.authorize_user(req.query.code, `${redirect_uri}?deepLink=${req.query.deepLink}`, function(err, result) {
    if (err) {
      res.redirect(`${req.query.deepLink}?err=${err.error_message}`);
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      console.log('redirecting to ', `${req.query.deepLink}token=${result.access_token}`);
      res.redirect(`${req.query.deepLink}token=${result.access_token}`);
    }
  });
});

app.use(express.static(path.join(__dirname, 'static/build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/build/index.html'));
});

const port = config.get('port');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
