/*Server serves at port 3000.
socket.io: is a library used for real-time web chat  */
var express = require('express');
    app = express();
    path = require('path');
    http = require('http').createServer(app); 
    io = require('socket.io').listen(http);


var login = require('./routes/login');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


app.use('/', login);

http.listen(3000,function(){
    console.log('Server listening on :3000');
}); //en el puerto 3000 sino pongo lo siguiente
//http.listen(process.env.PORT, process.env.IP);

//cada vez que alguien se conecte, se crea un nuevo 
//socket
//io syntax: ('event','message')
//emit the message to all sockets connected to it
io.on('connection',function(socket){
    console.log('User connected');
    //socket syntax: ('event', function(msg){})
    //waits for the event
    //Parámetro chat message: mandar mensaje en el tutorial era el id del formulario
    socket.on('sendMessage', function(data){
        io.emit('sendMessage', {msg:data});
    });
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

module.exports = app;




