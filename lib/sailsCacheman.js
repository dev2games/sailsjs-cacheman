/**
 * Simple wrapper to wrap around the Cacheman nodejs package to integrate easily with SailsJS for caching.
 * @param {[string]} name Name the Cache Instance.
 */

var Cache = function (name, options) {
  var Cacheman = require('cacheman');

  var _ = require('underscore');

  // Get configuration
  config = sails.config.cacheman;

  if (config === undefined) {
    throw new Error('No configuration file found. Please add the configuration app/config/cacheman.js');
  }

  // If a valid driver is selected.
  if (_.indexOf(['memory', 'redis', 'mongo', 'file'], config.driver) < 0) {
    throw new Error("Invalid Driver selected. Please choose from ('memory', 'redis', 'mongo', 'file')");
  }

  // If the options is set and it has a ttl then we will set the ttl in our cacheman config

  if (options && options.ttl) {
    config[config.driver].ttl = options.ttl;
  }

  var cache = new Cacheman(name, config[config.driver]);

  return cache;
};

module.exports = Cache;
