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
 //OR
//  let str = "user/picture/image/style.css";
//  let fileExtention = str.slice(-4); // '.css'


    function webserver(req, res){
        //if route requested '/' then, load index.htm or else
        //load requested file(s)
        let baseURI = url.parse(req.url);
        let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
            // console.log(filepath);
            //checked if the file is accessible or not
        fs.access(filepath, fs.F_OK, error => {
            if(!error){
                //request file and load server

        fs.readFile(filepath, (error, content) => {
            if(!error){

                console.log('Serving', filepath);
                //serve the file from buffer
                let contentType = mimes[path.extname(filepath)]; // mimes['.css'] === 'text/css;
                    res.writeHead(200, {'Content-type' : contentType});
                    res.end(content, 'utf-8');
            }else{
                res.writeHead(500);
                res.end('Server Could not load the requested file');
            }
        });

            }else{
            res.writeHead(404);
            res.end('Content not found!');
            }
        });   

}
    http.createServer(webserver).listen(3000, () => {
        console.log('Server running on port 3000');
    });
