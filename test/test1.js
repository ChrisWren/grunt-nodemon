var fs = require('fs'),
should = require('should');

after(function() {
  fs.unlink('./test/test.txt');
});

describe('When ignored files are specified', function() {
  it('the correct .nodemonignore file should be generated', function() {
    var fixtureFile = fs.readFileSync('./test/fixtures/.nodemonignoreTest', 'utf8'),
    generatedFile = fs.readFileSync('./.nodemonignore', 'utf8');
    generatedFile.should.equal(generatedFile);
  });
});

describe('When the --exec option is passed', function() {
  it('the non-node command should execute properly', function() {
    var touchedFile = fs.readFileSync('./test/test.txt', 'utf8');
    touchedFile.should.exist;
  });
});
