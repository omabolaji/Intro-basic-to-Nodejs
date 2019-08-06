'use strict';
const http = require('http');
http 
.createServer((rep, res) => {
   res.writeHead(200, {'content-type': 'text/html'});
   res.end('<h1> Hello NodeJS</h1>'); 
})
.listen(3000, () => console.log('server running on port 3000'));