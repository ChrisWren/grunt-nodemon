var fs    = require('fs');
var spawn = require('child_process').spawn;

var should = require('should');

describe('grunt-nodemon', function () {

  describe('when run  with the ignoredFiles option', function() {

    before(function (done) {
      var nodemonProcess = spawn('grunt', ['nodemon:all']);
      setTimeout(function() {
        done();
      }, 1000);
    });

    it('should generate the correct .nodemonignore file', function() {
      var fixtureFile = fs.readFileSync('test/fixtures/.nodemonignoreTest', 'utf8'),
      generatedFile = fs.readFileSync('.nodemonignore', 'utf8');
      generatedFile.should.equal(fixtureFile);
      fs.unlink('.nodemonignore');
    });

    describe('when the cwd option is also specified', function() {

      before(function (done) {
        var nodemonProcess = spawn('grunt', ['nodemon:cwd']);
        setTimeout(function() {
          done();
        }, 1000);
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
      var nodemonProcess = spawn('grunt', ['nodemon:empty']);

      setTimeout(function() {
        done();
      }, 1000);
    });

    it('the .nodemonignore file is removed', function() {
      fs.existsSync('.nodemonignore').should.beFalsy;
    });
  });

  describe('when run with the exec option', function() {

    before(function (done) {
      var nodemonProcess = spawn('grunt', ['nodemon:exec']);
      setTimeout(function() {
        done();
      }, 1000);
    });

    it('should executed the non-node command as expected', function() {
      var touchedFile = fs.readFileSync('test/test.txt', 'utf8');
      touchedFile.should.exist;
      fs.unlink('test/test.txt');
    });
  });
});
