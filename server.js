/*Server serves at port 3000.
socket.io: is a library used for real-time web chat 
Forma de conectar nuestra base de datos JOnline con mongoose es a través de esta url:
mongodb://localhost:27017/JOnline (nombre de la base de datos) */
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app); 
var io = require('socket.io').listen(http);
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var signup = require('./routes/signup');
var chat = require('./routes/chat');   
var mongoose = require('mongoose');
var mongo =  mongoose.connect("mongodb://localhost:27017/JOnline").connection;

//areglo que guardará el nombre de todos los usuarios conectados
var onlineUsers=[];

//conexión a la base de datos
mongo.on('error',function(err){
    console.log("Error to connect: "+err.message);
});
mongo.once('open', function(){
    console.log("Connected to mongo server.");
});

io.sockets.on('connection', function(socket){
    console.log("new user connected");
    /**
     * Evento que recibe de parámetro el mensaje (data) escrito desde el cliente
     * y devuelve al cliente el mismo mensaje,
     */
    socket.on('sendMessage', function(data){
      io.sockets.emit('output', {msg: data, nick: socket.nickname});
      
    });

    /**
     * Evento que devuelve la lista de usuarios
     * conectados en el chat. Le mandamos por parámetros
     * el arreglo creado arriba.
     */
    socket.on('onlineUsers', function () {
        socket.emit('onlineUsers', onlineUsers);
      });


    /**
     * Evento desconectar, mandamos mensaje a consola.     
    */
    socket.on('disconnect', function() {
        onlineUsers.splice(onlineUsers.indexOf(socket.user), 1);
        console.log("PRUEBA: " + onlineUsers);
        io.emit('remove user', socket.user);
        console.log('JOffline: user disconnected');
      });

     
    /**
     * Evento que se emite cuando un nuevo cliente se conecta e
     * informa al resto de usuarios que se ha conectado. Recibe  
     * de parámetros al nuevo usuario
     */
    socket.on('newUser', function (nuser) {
        socket.user = nuser;
        onlineUsers.push(nuser);
        io.emit('newUser', nuser);
      });

    socket.on('historial', function(messages){
        io.sockets.emit('historial', messages)
    });
  
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

//Server funtions 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/SignUp', signup);
app.use('/Chat',chat);

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


http.listen(3000,function(){
    console.log("Server listening on :3000");
});
module.exports = app;




