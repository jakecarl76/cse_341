const http = require('http');

const user_mod = require('./prove01-routes.js');

const server_obj = http.createServer(user_mod.req_handler);

console.log("Now running assignment_01 for week_01. Starting server on port 3000.\nYou can"
            + " exit the server by\n going to localhost:3000/exit-server\n or use ctrl + c "
            + "in the terminal.");

server_obj.listen(3000);