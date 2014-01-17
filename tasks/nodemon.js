/*
 * grunt-nodemon
 * https://github.com/ChrisWren/grunt-nodemon
 *
 * Copyright (c) 2014 Chris Wren and contributors
 * Licensed under the MIT license.
 */
var nodemon = require('nodemon');

module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('nodemon', 'Runs a nodemon monitor of your node.js server.', function () {

    this.async();
    var options = this.options();

    options.script = this.data.script;

    var eventsCallback;

    if (options.eventsCallback) {
      eventsCallback = options.eventsCallback;
      delete options.eventsCallback;
    } else {
      eventsCallback = function(eventName, eventContent) {

        // By default the nodemon output is logged
        if (eventName === 'log') {
          console.log(eventContent.colour);
        }
      };
    }

    nodemon(options);

    [
      'start',
      'crash',
      'exit',
      'restart',
      'log',
      'config:update'
    ].forEach(function (eventName) {
      nodemon.on(eventName, function (event) {
        eventsCallback(eventName, event);
      });
    });
  });
};
