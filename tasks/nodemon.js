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

    var options = this.options();
    var args = [];
    this.async();

    if (options.nodeArgs) {
      options.nodeArgs.forEach(function (arg) {
        args.push(arg);
      });
    }

    if (options.ignoredFiles) {
      options.ignoredFiles.forEach(function (folder) {
        args.push('--ignore');
        args.push(folder);
      });
    }

    if (options.exec) {
      args.push('--exec');
      args.push(options.exec);
    }

    if (options.execMap) {
      args.push('--execMap');
      args.push(options.execMap);
    }

    if (options.delayTime) {
      args.push('--delay');
      args.push(options.delayTime);
    }

    if (options.legacyWatch) {
      args.push('--legacy-watch');
    }

    if (options.watchedFolders) {
      options.watchedFolders.forEach(function (folder) {
        args.push('--watch');
        args.push(folder);
      });
    }

    if (options.watchedExtensions) {
      args.push('-e');
      args.push(options.watchedExtensions.join(','));
    }

    if (options.exitcrash) {
      args.push('--exitcrash');
    }

    if (options.cwd) {
      args.push('--cwd');
      args.push(options.cwd);
    }

    if (options.env) {
      var envProps = Object.keys(options.env);
      envProps.forEach(function (envProp) {
        args.push(envProp + '=' + options.env[envProp]);
      });
    }

    if (options.file) {
      args.push(options.file);
    }

    if (options.nostdin) {
      args.push('--no-stdin');
    }

    if (options.args) {
      options.args.forEach(function (arg) {
        args.push(arg);
      });
    }

    nodemon(args.join(' '));

    if (options.eventsCallback) {
      [
        'start',
        'crash',
        'exit',
        'restart',
        'log',
        'config:update'
      ].forEach(function (eventName) {
        nodemon.on(eventName, function (event) {
          options.eventsCallback(eventName, event);
        });
      });
    } else {

      // Default logging
      nodemon.on('log', function(event) {
        console.log(event.message);
      });
    }
  });
};
