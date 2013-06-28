var fs = require('fs');
var should = require('should');

describe('When the ignoredFiles is removed after being present', function() {
  it('the .nodemonignore file is removed', function() {
    var exists = fs.existsSync('.nodemonignore');
    exists.should.beFalsy;
  });
});
