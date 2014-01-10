var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(process.env.PORT || 1337, '127.0.0.1');
console.log('Current working directory: ' + process.cwd());
console.log('Port: ' + process.env.PORT);
console.log('Server running at http://127.0.0.1:' + process.env.PORT || 1337);
