module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    nodemon: {
      all: {
        options: {
          file: 'test/fixtures/server.js',
          args: ['production'],
          nodeArgs: ['--debug'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js', 'md'],
          watchedFolders: ['test', 'tasks'],
          delayTime: 1,
          legacyWatch: true,
          env: {
            PORT: '8181'
          }
        }
      },
      cwd: {
        options: {
          file: 'server.js',
          cwd: 'test/fixtures',
          ignoredFiles: ['README.md', 'node_modules/**']
        }
      },
      empty: {}
    },
    mdlint: ['README.md'],
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
  grunt.registerTask('test', ['jshint', 'mdlint', 'simplemocha']);

  grunt.loadTasks('tasks');

};
