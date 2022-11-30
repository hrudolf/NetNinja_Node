const fs = require('fs');
const http = require('http');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //lodash
    const num = _.random(0, 20);
    console.log(num);
    const greet = _.once(() => {
        console.log('hello');
    })

    greet();
    greet();

    res.setHeader('Content-Type', 'text/html');

    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

})

server.listen(3000, 'localhost', () => {
    console.log('listening on localhost:3000');
})