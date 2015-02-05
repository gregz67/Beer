/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var https = require('https');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8443);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var fs = require('fs');
var privateKey = fs.readFileSync('.ssh/key.pem', 'utf8');
var certificate = fs.readFileSync('.ssh/cert.pem', 'utf8');

var credentials = {
  key: privateKey,
  cert: certificate
};
var httpsServer = https.createServer(credentials, app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
  server: httpsServer
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('{ some_payload: {}}');
});

module.exports = app;

