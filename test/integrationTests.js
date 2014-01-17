/*jshint expr: true*/
var spawn = require('child_process').spawn;

require('should');

var logOutput = '';
function runNodemon(target, done) {
  var nodemonProcess = spawn('grunt', ['nodemon:' + target]);
  nodemonProcess.stdout.setEncoding('utf8');
  nodemonProcess.stdout.on('data', function (data) {
    logOutput += data;
    if (data.match(/Server/)) {
      nodemonProcess.kill();
      done();
    }
  });
}

describe('grunt-nodemon', function () {

  describe('when run with all options specified', function () {

    before(function (done) {
      runNodemon('all', done);
    });

    it('should set arguments to the app correctly', function() {
      logOutput.should.include('production');
    });

    it('should set node arguments correctly', function() {
      logOutput.should.include('debug');
    });

    it('should set the ignored files correctly', function() {
      logOutput.should.include('README.md');
    });

    it('should set the watched extensions correctly', function() {
      logOutput.should.include('tasks');
    });

    it('should set the delay time correctly', function() {
      logOutput.should.include('1000');
    });

    it('should set the legacy watch correctly', function() {
      logOutput.should.include('legacyWatch: true');
    });

    it('should set environment variables correctly', function() {
      logOutput.should.include('Port: 8181');
    });

    it('should set the eventsCallback correctly', function() {
      logOutput.should.include('custom logging');
    });
  });

  describe('when run with no options specified', function () {

    before(function (done) {
      runNodemon('none', done);
    });

    it('should log nodemon output', function() {
      logOutput.should.include('debug');
    });
  });
});
