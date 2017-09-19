//
// # SimpleServer
//
// A simple chatBot server using Socket.IO, Express, and Body-Parser e Request.
//
var http = require('http');
var path = require('path');


var socketio = require('socket.io');
var express = require('express');
var bodyParser = require('body-parser')
var request = require('request')
//
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
          constructMessage(event)
        }else{
          if(event.postback && event.postback.payload){
            console.log(event.postback.payload)
            switch(event.postback.payload){
              case 'clicou_comecar':
                sendTextMessage(event.sender.id,"Como posso te ajudar? Escolha algum ministério abaixo:")
                sendMenu(event.sender.id)
                break;
            }
          }
        }
      })
      
    })
    
    res.sendStatus(200)
  }
})
//   token :

function constructMessage(event){
  var message = event.message;
  var senderID = event.sender.id;
  // Bot answer 
  var messageId = message.mid;
  var messageText = message.text;
  var attachments = message.attachments;
  
  if(messageText){
    switch (messageText) {
      case 'eae':
        sendTextMessage(senderID, 'Como posso te ajudar?')
        sendMenu(senderID)
        break;
      case 'xau':
        sendTextMessage(senderID, 'Tchau, valeu.')
        break;
      default:
        // code
        sendTextMessage(senderID, 'Obrigado e volte sempre.')
        
    }
  }else if(attachments){
    console.log('recebi anexos!!')
  }
  
}

function sendTextMessage(recipientId,messageText){
  var messageData = {
    recipient:{
      id: recipientId
    },
    
    message:{
      text: messageText
    }
  }
  
  callSendAPI(messageData)
}

function sendMenu(recipientId){
  var messageData = {
    recipient:{
      id: recipientId
    },
    
    message:{
      attachment: {
        type: 'template',
        payload: {
          template_type: "button",
          text: 'O que você procura?',
          buttons: [
            {
              type: 'web_url',
              url: 'www.google.com',
              title: 'Acesse nosso site!'
            },
          ]
        }
        
      }
      
    }
  }
  
  callSendAPI(messageData)
}


function callSendAPI(messageData){
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAADwfhlIoLABALDcesn63Sk0Yvb3Y3rcYYPejr43fNJeO1kbZBK2cuiPGHAVXdtsHL4VHlKCmfctZBY82On0wPko1QSZCYjJUPK9hVvAuRM8WDqAhyn4bvhCvWpXKoqtEZAjZCqJDdnNPSz3QsZCYeKyZA5t3nw99nZCZCHZBJPZCXukgAaYJDUhewk' },
    method: 'POST',
    json: messageData
  
    
  },function(error,response,body){
    if(!error && response.statusCode == 200){
      
      console.log("Mensagem enviada com sucesso...")
      var recipientId = body.recipient_id;
      var messageId = body.message_id;
      
    }else{
      console.log('Mensagem não enviada...')
    }
  })
  
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
