const http = require('http');
const taskController = require('./controller/task.controller');


const server = http.createServer((req, res) => {

    const { url, method } = req;

    // Logger
    console.log(`URL: ${url} - Method: ${method}`);

    switch (method) {
        case "GET":
            if (url === "/") {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'Received' }));
                res.end();
            }
            if (url === "/tasks") {
                taskController.getTaskHandler(req, res);
            }
            break;
        case "POST":
            if (url === "/tasks") {
                taskController.createTaskHandler(req, res);
            }
            break;
        case "PUT":
            taskController.updateTaskHandler(req, res);
            break;
        case "DELETE":
            taskController.deleteTaskHandler(req, res);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 NOT FOUND');
            res.end();
            break;
    }

});

server.listen(3000);
console.log('Server on port', 3000);