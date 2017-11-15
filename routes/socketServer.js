exports.handle = function(io){
    io.sockets.on('connection',function(soket){
        socket.on('sendMessage', function(data){
        io.sockets.emit('output', {msg:data});
        });
  });
}