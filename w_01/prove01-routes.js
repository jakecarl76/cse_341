const fs = require('fs');

function req_handler(req, resp)
{
  const url = req.url;
  const method = req.method;
  
  if( url === '/')
  {
    //send out greeting and user creation form
    let tmp_html = html_st("Welcome to Assignment01");
    
    //create greeting
    tmp_html += "<div class='main'>\n<h1> Welcome! Please register as a user </h1>\n";
    tmp_html += "<form action='/create-user' method='post'>\n"
             + "<label for='user_name'>User Name:</label>\n"
             + "<input type='text' id='user_name' name='user_name'>\n"
             + "<input type='submit' value='Register'>\n"
             + "</form>\n</div>\n</body>\n</html>";
    //send response
    resp.setHeader('Content-Type', 'text/html');
    resp.write(tmp_html);
    resp.end();
  }
  else if( url === '/users')
  {
     //read from fileCreatedDate
    let tmp_data = ""
    tmp_data = fs.readFile('usrs.txt', 'utf8',
                          (err, txt_data) => {
                            if(err)
                            {
                              console.log("Error reading user file: " + err);
                              return;
                            }
                            else
                            {
                              console.log(txt_data);
                              
                              let tmp_html = html_st("Registered Users");
                              tmp_html += "<div class='main'>";
                              
                              //check if no users
                              if(txt_data == "")
                              {
                                tmp_html += "<h1> No Users Registered </h1>"
                              }
                              else
                              {
                                //split users
                                let tmp_usrs = txt_data.split(';');
                                
                                tmp_html += "<h1> Registered Users </h1>\n<ul>\n";
                                
                                for(let user of tmp_usrs)
                                {
                                  if(user != "")
                                  {
                                    tmp_html += "<li>" + user + "</li>";
                                  }
                                }
                              }
                              
                              //tie off html
                              tmp_html += "<br><a href='/'> Back </a>"
                              tmp_html += "</div>\n</body>\n</html>";
                              
                              //send response
                              resp.setHeader('Content-Type', 'text/html');
                              resp.write(tmp_html);
                              resp.end();
                            }//End success read file
                            
                          });//END readFile
  }
  else if( url === '/create-user' && method === 'POST')
  {
    const body = [];
    //create event listener for when data is loaded
    req.on('data',
           (data) => {
             body.push(data);
           });
           
    //create listener for when all data loaded
    return req.on('end',
                  () => {
                    //gather data and make a string
                    const full_data = Buffer.concat(body).toString();
                    
                    //pull new user name from data, add break (';') for saving to file
                    let new_user = full_data.split('=')[1];
                    
                    //write to console
                    console.log(new_user)
                    
                    new_user = ";" + new_user;
                    
                    //append new user to file and send response headers
                    fs.appendFile('usrs.txt',
                                  new_user,
                                  (err) => {
                                    if (err)
                                    {
                                      console.log("Error writing new user to file: " + err);
                                      //send user back to home page
                                      resp.statusCode = 302;//redirect
                                      resp.setHeader('Location', '/');
                                      resp.end();
                                    }
                                    else
                                    {
                                      //send user to users page
                                      resp.statusCode = 302;//redirect
                                      resp.setHeader('Location', '/users');
                                      resp.end();
                                    }
                                  });
                  });//end return on end listener
  }
  else if( url === '/exit-server')
  {
    process.exit();
  }
  else if(url === '/favicon.ico')
  {
    console.log("No icon for you!");
  }
  else if(url === '/main.css')
  {
    let tmp_css = ".main\n"
        + "{"
        + "  margin: 0 auto;"
        + "  padding: 15px;"
        + "  border: solid black 2px;"
        + "  border-radius: 15px;"
        + "  max-width: 500px"
        + "}"
        + "body"
        + "{"
        + "  padding-top: 55px;"
        + "}"
        + ""
        + ""
        + ""
        + ""
        + ""
        + ""
        + ""
        + ""
        + ""
        + ""
        + ""
        + ""
        + "";        
  
    resp.setHeader('Content-Type', 'text/html');
    resp.write(tmp_css);
    resp.end();
  }
  else
  {
    console.log("Error, page " + url + " does not exist");
    resp.statusCode = 302;//redirect
    resp.setHeader('Location', '/');
    resp.end();
  }
}


function html_st(title)
{
  return "<html>\n"
       + "  <head>\n"
       + "    <title>" + title +"</title>\n"
       + "    <link href='main.css' rel='stylesheet'>"
       + "  </head>\n"
       + "  <body>";
}

module.exports = { req_handler: req_handler,
                    
                 }