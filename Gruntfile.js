module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    nodemon: {
      all: {
        script: 'server.js',
        options: {
          cwd: __dirname + '/test/fixtures',
          ignored: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js', 'md'],
          watchedFolders: ['test', 'tasks'],
          delayTime: 1,
          nostdin: true,
          exitcrash: true,
          legacyWatch: true,
          env: {
            PORT: '8181'
          },
          args: ['production'],
          nodeArgs: ['--inspect'],
          callback: function(nodemon) {
            nodemon.on('log', function(event) {
              console.log(event.colour);
            });
            nodemon.on('config:update', function(event) {
              console.log('custom logging');
              console.log(event);
            });
          }
        }
      },
      none: {
        script: 'test/fixtures/server.js',
      }
    },
    markdownlint: {
      src: [ 'README.md'],
      options: {
          config: { //configure the linting rules
             'default': true,
             'line-length': false,
             'blanks-around-headers': false,
             'no-duplicate-header': false,
             'no-inline-html': false
          }
      },
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 10000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: {
        src: ['test/integrationTests.js']
      }
    },
    jshint: {
      options: {
        bitwise: true,
        indent: 2,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        nonew: true,
        quotmark: 'single',
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        trailing: true,
        eqnull: true,
        node: true,
        expr: true,
        evil: true,
        globals: {
          describe: true,
          it: true,
          before: true
        }
      },
      files: {
        src:  ['*.js', 'test/*.js', 'tasks/*.js']
      }
    }
  });

  grunt.registerTask('default', ['nodemon']);
  grunt.registerTask('test', ['jshint', 'markdownlint', 'simplemocha']);

  grunt.loadTasks('tasks');

};
