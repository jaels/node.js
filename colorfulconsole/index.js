
const http = require('http');
const chalk = require('chalk');
const fs = require('fs');
const querystring = require('querystring');


var server = http.createServer(function(request, response) {
    var method = request.method;
    var url = request.url;
    var headers = request.headers;

    console.log(method);
    console.log(url);
    console.log(headers);

    if (method==='GET') {


        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        response.write('<html>');
        response.write('<title>Colors</title>');
        response.write('<form method="POST">');
        response.write('<input type="text" name="text">');
        response.write('<select name="color">');
        response.write('<html>');
        response.write('<option value="red">red</option>');
        response.write('<option value="blue">blue</option>');
        response.write('<option value="green">green</option>');
        response.write('<option value="yellow">yellow</option>');
        response.write('<option value="gray">gray</option>');
        response.write('<option value="magenta">magenta</option>');
        response.write('<option value="cyan">magenta</option>');
        response.write('</select>');
        response.write('<button type="submit">Go</button>');
        response.write('</form>');
        response.write('</html>');

        response.end();

    }

    var par;
    if (method==='POST') {
        var body = '';
        request.on('data', function(chunk) {
            body += chunk;
        }).on('end', function() {
            par = querystring.parse(body);
            console.log(chalk[par.color](par.text));
            finish();
        });

        function finish() {
            response.write('<html>');
            response.write('<title>' + par.text + '</title>');
            response.write('<a href="/" style="color:' + par.color + '"' + ">" + par.text + "</a>");
            response.write('</html>');
            response.end();
        }



    }



});








server.listen('8080');
