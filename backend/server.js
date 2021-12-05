import express from 'express';
import routes from './routes/';
import bodyParser from 'body-parser';

/* eslint no-console: 0 */

const path = require('path');

const port = process.env.PORT || 1337;

const app = express();

app.use(express.static('app'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routes(app);

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎  Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
