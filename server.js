'use strict'

const config = require('./config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const db = require('./app/db');
const opn = require('opn')
const path = require('path')
const express = require('express')
const itemRoutes = require('./app/route-handlers/db-items');
const categoryRoutes = require("./app/route-handlers/db-categories");
const transactionRoutes = require('./app/route-handlers/db-transactions');
const userRoutes = require('./app/route-handlers/db-users');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./build/webpack.prod.conf')
  : require('./build/webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
// const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// const proxyTable = config.dev.proxyTable

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "id_user, id, items, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}
app.use(express.static('static'));
app.use(itemRoutes);
app.use(transactionRoutes);
app.use(userRoutes);
app.use(categoryRoutes);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// TODO add /callback handling on server size
// app.get('/callback',
//   passport.authenticate('auth0', { failureRedirect: '/login' }),
//   function (req, res) {
//     if (!req.user) {
//       throw new Error('user null');
//     }
//     res.redirect("/");
//   }
// );


app.use(express.urlencoded());
// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
portfinder.getPort((err, port) => {
  if (err) {
    _reject(err)
  }
  process.env.PORT = port
  var uri = 'http://localhost:' + port
  if (process.env.NODE_ENV !== 'production') {
    console.log('running in DEV mode');
  }
  console.log('> Listening at ' + uri + '\n')
  server = app.listen(port)
  _resolve()
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
