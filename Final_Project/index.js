// import modules for server
var http = require('http'); 
var url = require('url'); // parsing request urls
var fs = require('fs'); // file system
var path = require('path'); // for handing paths

var port = 8080; // port number
const logFilepath = "./server/logs/log.txt"; // path to log file


console.log("Starting server on port " + port); // log to console that server is starting

http.createServer(function (req, res) { // create a http server
  if (url.parse(req.url, true).pathname == '/') { // set root path to index.html (main html file)
    req.url = "/index.html";
  }

  if (url.parse(req.url, true).pathname === '/logs') { // serve the log file when requested
    fs.readFile(logFilepath, function (err, data) { // read log file
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const chunks = data.toString().split('\n\n'); // format log file so it can be displayed
      let html = ''; 
      chunks.forEach(chunk => {
        html += `${chunk} <br><br>`; // format chunks of log information with page breaks
      });
      res.write(`<h1>Logs: </h1> <br><br> ${html}`); // write formatted log page
      return res.end();
    })
    return; 
  }

  var q = url.parse(req.url, true); // parse requested url
  const filename = "." + q.pathname; // construct file name from the request

  var content_type = 'text/html'; // sets the default content type to html

  if (q.pathname.endsWith('.css')) { // adjust content type to CSS file if requested
    content_type = 'text/css';
  }

  fs.readFile(filename, function (err, data) { // read the file that was requested
    const log = `request made to ${req.url} @ ${new Date().toString()}\n\n`; // prep log entry for this request

    fs.writeFile(logFilepath, log, { flag: 'a+' }, (err) => { // add the log entry to the log file
      if (err) {
        console.log(err.message); // add error to logs
      }
    });

    if (err) { // error 404 if file can't be read
      console.log(err.message); // add error msg to logs
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("<h1>404 Resource Not Found</h1>");
    }

    res.writeHead(200, { 'Content-Type': content_type }); // set response headers and status code
    res.write(data); // writes to response body
    return res.end(); 
  });
}).listen(port); 