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
          exec: 'less'

  grunt.registerTask 'default', ['nodemon']
  grunt.loadTasks 'tasks'
