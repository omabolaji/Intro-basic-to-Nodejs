'use strict'

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let mimes = {
    '.htm' : 'text/html',
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'text/javascript',
    '.jpg' : 'image/jpeg',
    '.png' : 'image/png',
    '.gif' : 'image/gif'
}

    function fileAccess(filepath){
        return new Promise((resolve, reject) => {
            fs.access(filepath, fs.F_OK, error =>{
                if(!error){
                    resolve(filepath)
                }else(
                    reject(error)
                )
            })
        });
    }

    function streamFile(filepath){
        return new Promise((resolve, reject) =>{
            let fileStream = fs.createReadStream(filepath);
                fileStream.on('open', () => {
                    resolve(fileStream);
                });
                fileStream.on('error', error =>{
                    reject(error);
                });
        });
    }

    function webserver(req, res){
        let baseURI = url.parse(req.url);
        let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
        let contentType = mimes[path.extname(filepath)];

        fileAccess(filepath)
            .then(streamFile)
            .then(fileStream =>{
                console.log('Serving', filepath);
                res.writeHead(200 , {'Content-type' : contentType});
                fileStream.pipe(res);
            })
            .catch(error =>{
                res.writeHead(404)
                res.end(JSON.stringify(error));
            });

    }
http.createServer(webserver).listen(3000, () =>{
    console.log('Server running on port 3000');
 });