// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req,res)=>{
  let date_param = req.params.date
  let output = {}
  if(date_param){
    if(date_param.includes('-') || date_param.includes(',')){
        let date = new Date(date_param)
      output = {"unix":(date.getTime()),"utc":date.toUTCString()}

    }
   else{
       let date = new Date(Number(date_param))
     output = {"unix":(date.getTime()),"utc":date.toUTCString()}
   }
    if(output['utc'].includes('Invalid')){
      res.send({ error : "Invalid Date" })
    }
  res.send(output)
  }
else{
  let date=  new Date(Date.now())
  res.send({"unix":(date.getTime()),"utc":date.toUTCString()})
}

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
