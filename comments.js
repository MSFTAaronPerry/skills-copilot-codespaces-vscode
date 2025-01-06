// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var comments = [];
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname;
    if (pathName === '/') {
        var filePath = path.join(__dirname, 'index.html');
        var fileContent = fs.readFileSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(fileContent);
    } else if (pathName === '/submit') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else if (pathName === '/get') {
        var jsonStr = JSON.stringify(comments);
        res.end(jsonStr);
    } else {
        var filePath = path.join(__dirname, pathName);
        fs.readFile(filePath, 'binary', function (err, fileContent) {
            if (err) {
                res.writeHead(404, 'Not Found');
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(200, 'OK');
                res.write(fileContent, 'binary');
                res.end();
            }
        });
    }
});

server.listen(8080, function () {
    console.log('Server is running...');
});