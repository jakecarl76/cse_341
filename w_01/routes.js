const fs = require('fs');


const req_handler = (req, resp) => {

  //parse the url
  const url = req.url;
  const method = req.method;
  let html_data = "";
  let header_data = ['Content-Type', 'text/html'];//set default header


  if(url === '/')
  {
    header_data = ['Content-Type', 'text/html'];
    html_data = "<html>\n"
              + "  <head>\n"
              + "    <title>first_app_response_page</title>\n"
              + "  </head>\n"
              + "  <body>"
              + "    <form action='/message' method='POST'>\n"
              + "      <input type='text' name='msg'>\n"
              + "      <button type='submit'>Send</button>\n"
              + "<div><a href='/exit'>Exit Server</a></div>\n"
              + "    </form>\n"
              + "  </body>\n"
              + "</html>\n"
              + "\n"
              + "\n";
  }
  else if(url === '/message' && method === 'POST')
  {
    const body = [];
    //create an event listener
    req.on('data',
           (chunk) => {
             console.log(chunk);
             body.push(chunk);
             });

    //what to do when request done loading (event listener for req done loading)
    //set to return or exit this iteration of the listener function so that
    //later request or response code doesn't have a chance to respond before
    //the async function gets it's chance to respond with correct response
    //in its async function
    return req.on('end',
           () => {
             //create buffer and add all chunks from body arr to it
               //then convert to string
             const parsed_body = Buffer.concat(body).toString();
             console.log(parsed_body);
             
             //extract message
             let msg = parsed_body.split('=')[1];
             
             //write the user's message
             //fs.writeFileSync('usr_msg.txt', msg);
             fs.writeFile('usr_msg.txt', msg, 
                          (err) => {
                           //NOTE: Need to have the writing and ending of response
                           //here in this func since it could otherwise send the response
                           //before this code has a chance to execute asynchronously
                           
                           //redirect user to main page (302 = redirect code)
                           resp.statusCode = 302;//redirect
                           header_data = ['Location', '/'];
                           
                           resp.setHeader(header_data[0], header_data[1]);
                           resp.end();
                          });
           });
    
  }
  else if(url === "/exit")
  {//exit program when user types in url localhost:3000/exit
    process.exit();//hard exit the event loop
  }


  //write a response to clientInformation
  resp.setHeader(header_data[0], header_data[1]);
    
  resp.write(html_data);
  resp.end();

};

//export the request handler function
module.exports = req_handler;

