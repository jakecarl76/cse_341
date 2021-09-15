const http = require('http');


//import our custom request handler function (ending .js is optional)
const routes = require('./routes');

//create a server
const server_obj = http.createServer(routes);

server_obj.listen(3000);