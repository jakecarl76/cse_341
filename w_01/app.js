const http = require('http');

function rq_listener(req, resp) //request/response
{
  //console.log(req); //output to console whole request
  console.log(req.url, req.method, req.headers);
  
  //write a response to clientInformation
  resp.setHeader('Content-Type', 'text/html');
  
  //can write to response multiple times
  //resp.write("hello");
  //resp.write(" world!");
  
  let html_data = "<html>\n<head>\n<title>first_app_response_page</title>"
                + "\n</head>\n<body>\n<h1>Hello from the node server!</h1>\n"
                + "<p>Welcome to the first response!</p>\n"
                + "<a href='/exit'>Exit Server</a>\n</body>\n</html>";
  
  resp.write(html_data);
  resp.end();
  
  
  
  //exit program when user types in url localhost:3000/exit
  if(req.url == "/exit")
  {
    process.exit();//hard exit the event loop
  }
}

//create a server
const server_obj = http.createServer(rq_listener);

server_obj.listen(3000);