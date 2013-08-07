module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    nodemon: {
      all: {
        options: {
          file: 'test/server.js',
          args: ['production'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js', 'coffee', 'litcoffee'],
          watchedFolders: ['test', 'tasks'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: '8181'
          }
        }
      },
      cwd: {
        options: {
          file: 'server.js',
          cwd: 'test/',
          ignoredFiles: ['README.md', 'node_modules/**']
        }
      },
      empty: {}
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: {
        src: ['test/**/*.js']
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
  grunt.registerTask('test', ['jshint', 'simplemocha']);

  grunt.loadTasks('tasks');

};
