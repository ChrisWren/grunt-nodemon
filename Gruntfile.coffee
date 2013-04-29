module.exports = (grunt) ->

  grunt.initConfig
    nodemon:
      prod:
        options:
          file: 'test/server.js'
          args: ['production']
          ignoredFiles: ['README.md', 'node_modules/**']
          watchedExtensions: ['js', 'coffee']
          watchedFolders: ['test', 'tasks']
          debug: true
          delayTime: 1
      exec:
        options:
          file: 'test/testfile.txt'
          exec: 'touch'

    simplemocha:
      options:
        globals: ['should']
        timeout: 3000
        ignoreLeaks: false
        ui: 'bdd'
        reporter: 'nyan'
      all:
        src: ['test/**/*.coffee']

  grunt.registerTask 'default', ['nodemon']
  grunt.registerTask 'test', ['simplemocha']
  grunt.loadNpmTasks 'grunt-simple-mocha'
  grunt.loadTasks 'tasks'
