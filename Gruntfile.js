module.exports = function(grunt) {
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
      exec: {
        options: {
          file: 'test/test.txt',
          exec: 'touch'
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
    }
  });
  grunt.registerTask('default', ['nodemon']);
  grunt.registerTask('test', ['simplemocha']);
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadTasks('tasks');
};
