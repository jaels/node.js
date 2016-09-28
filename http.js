
const http = require('http');
const fs = require('fs');

var server = http.createServer(function(request, response) {
    var method = request.method;
    var url = request.url;
    var headers = request.headers;

    console.log(method);
    console.log(url);
    console.log(headers);

    var date = new Date().toJSON().slice(0,10);

    fs.appendFile('requests.txt', date + '\n' + method + '\n' + url + '\n' + headers['user-agent'], (err) => {
        if (err) throw err;
    });


    request.on('error', function(err) {
        throw(err);
    });


    if (request.method === 'GET' && request.url === '/requests.txt') {
        response.setHeader('Content-Type', 'text/plain');
        var readStream = fs.createReadStream(__dirname + '/requests.txt');
        readStream.pipe(response);

    }



    else if (method==='GET') {

        var body = '';
        request.on('data', function(chunk) {
            body += chunk;
        }).on('end', function() {
            console.log(body);
        });

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        response.end('<html><body><h1>Hello, World!</h1></body></html>');

    }

    else if (method==='HEAD') {

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end();

    }
    else if (method==='POST') {

        var body = '';
        request.on('data', function(chunk) {
            body += chunk;
        }).on('end', function() {
            console.log(body);
        });


        response.writeHead(302, {
            'Location': '/'
        });
        response.end();

    }

    else {
        response.statusCode = 403;
        response.end();
    }

    response.on('error', function(err) {
        throw(err);
    });
});



server.listen('8080');
