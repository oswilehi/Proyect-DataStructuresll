var express = require('express');
var router = express.Router();
var messageModel = require('../schemas/messageSchema');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var http = require('http').createServer(app); 
var io = require('socket.io').listen(http);

router.get('/', function(req, res, next) {
  res.render('chat');
});

io.on('connection',function(soket){
  socket.on('sendMessage', function(data){
    io.sockets.emit('output', {msg:data});
  })
  //send status
 /* sendStatus = function(s){
    soket.emit('status',s);
  }
  soket.on('sendMessage',function(data){
    
    let message = data.message;
    let sender = user.name;
   // let reciever = data.reciever;
    //let privateKey = data.privateKey;
    if(sender ==''|| message==''){
      //Send error status
      sendStatus('Error: enter a name and message');
    }else{
      //insert message
      var newMessage = messageModel({
        message: message,
        sender : user.name,
        reciever : reciever,
        privateKey : privateKey

      });
      newMessage.save(function(err,res){
        if(err)throw err;
        console.log('New message added.');
        console.log(res);
        io.emit('output', {name: newMessage.name, message: newMessage.message});
        //send status
        sendStatus('Message added.');
      });
    }
  });*/
});
module.exports = router;