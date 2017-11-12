/*Server serves at port 3000.
socket.io: is a library used for real-time web chat 
Forma de conectar nuestra base de datos JOnline con mongoose es a través de esta url:
mongodb://localhost:27017/JOnline (nombre de la base de datos) */
var express = require('express');
    app = express();
    path = require('path');
    http = require('http').createServer(app); 
    io = require('socket.io').listen(http);


var login = require('./routes/login');
var signup = require('./routes/signup');
var chat = require('./routes/chat');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


app.use('/', login);
app.use('/signup', signup);
app.use('/chat',chat);

// catch 404 and forward to error handler
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat');
});

module.exports = router;
  

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




