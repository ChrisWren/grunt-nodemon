/*jshint expr: true*/
var fs    = require('fs');
var spawn = require('child_process').spawn;

require('should');

function runNodemon(target, done) {
  var logOutput = '';
  var nodemonProcess = spawn('grunt', ['nodemon:' + target]);
  nodemonProcess.stdout.setEncoding('utf8');
  nodemonProcess.stdout.on('data', function (data) {
    logOutput += data;
    if (data.match(/Server running/)) {
      nodemonProcess.kill();
      done();
    }
  });
}

describe('grunt-nodemon', function () {

  describe('when run with the ignoredFiles option', function() {

    before(function (done) {
      runNodemon('all', done);
    });

    it('should generate the correct .nodemonignore file', function() {
      var fixtureFile = fs.readFileSync('test/fixtures/.nodemonignoreTest', 'utf8'),
      generatedFile = fs.readFileSync('.nodemonignore', 'utf8');
      generatedFile.should.equal(fixtureFile);
      fs.unlink('.nodemonignore');
    });

    describe('when the cwd option is also specified', function() {

      before(function (done) {
        runNodemon('cwd', done);
      });

      it('should generate the correct .nodemonignore file in the cwd folder', function() {
        var fixtureFile = fs.readFileSync('test/fixtures/.nodemonignoreTest', 'utf8'),
        generatedFile = fs.readFileSync('test/.nodemonignore', 'utf8');
        generatedFile.should.equal(fixtureFile);
        fs.unlink('test/.nodemonignore');
      });
    });
  });

  describe('when the ignoredFiles option is removed after being present', function() {

    before(function (done) {
      fs.writeFileSync('.nodemonignore', '');
      runNodemon('empty', done);
    });

    it('the .nodemonignore file is removed', function() {
      fs.existsSync('.nodemonignore').should.beFalsy;
    });
  });
});
