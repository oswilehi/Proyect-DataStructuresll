var express = require('express');
var router = express.Router();
var path = require('path');

var bodyParser = require('body-parser');
var app = express();
const client = require("socket.io").listen(4000).sockets;


/*client.on('connection', function(){
  var messageModel = require('../schemas/messageSchema');
    sendStatus = function(s){
      socket.emit('status',s);
    }
    
    messageModel.find().limit(100).sort({_id:1}).toArray(function(err, res){
        if (err) throw err;

        socket.emit('output', res);
    });

    // Handle input events

    socket.on('input', function(data){
      let name = data.name;
      let message = data.message;

      // Check for name and message
      if (name == "" || message == ""){
        sendStatus('Please enter a name and a message');
      }
      else{
          var newMessage = messageModel({
          message : message,
          sender : name,
          receiver: "",
          privateKey: ""
        });
        newMessage.save();
      }
    })
});*/

router.get('/', function(req, res, next) {
    res.render('chat');
});
  
module.exports =router;



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
//});
//module.exports = router;