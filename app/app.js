window.SensicalDebug = require('debug');
var domready = require('domready');
var debug = require('debug')('app');

domready(function () {
  debug('dom ready');
});
