//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');


var socketio = require('socket.io');
var express = require('express');
var bodyParser = require('body-parser')
var request = require('request')
//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);


router.use(express.static(path.resolve(__dirname, 'client')));
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))


router.get('/webhook', function(req,res){
  if(req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'minhasenha'){
    console.log('ok')
    res.status(200).send(req.query['hub.challenge'])
  }else{
    console.log('Falhou...')
    res.sendStatus(403)
  }
});

router.post('/webhook',function(req,res){
  var data = req.body;
  
  if(data && data.object === 'page'){
   
    // percorrendo os entry
    data.entry.forEach(function(entry){
      var pageId = entry.id;
      var timeOfEvent = entry.time;
      
      // percorrendo as mensagens
      entry.messaging.forEach(function(event){
        if(event.message){
          console.log(event.message);
        }
      })
      
    })
    
    res.sendStatus(200)
  }
})
//   token :



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
