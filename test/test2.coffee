fs = require('fs')
should = require('should')

describe 'When the ignoredFiles is removed after being present', () ->
  it 'the .nodemonignore file is removed', () ->
    exists = fs.existsSync('.nodemonignore')
    exists.should.beFalsy
