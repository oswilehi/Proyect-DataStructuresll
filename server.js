/*Server serves at port 3000.
socket.io: is a library used for real-time web chat  */
var express = require('express');
var app = express();
var http = require('http').Server(app); 
var socket = require('socket.io');
var io = socket(http);
var index = require('./routes/index');

app.use('/', index);

//io syntax: ('event','message')
//emit the message to all sockets connected to it
io.on('connection',function(socket){
    console.log('User connected');
    //socket syntax: ('event', function(msg){})
    //waits for the event
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

http.listen(3000,function(){
    console.log('Server listening on :3000');
});

