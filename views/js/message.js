
var x = $("#hidden").html(); 
alert(x);
 jQuery(function($){
   
   //son nuestros divs que forman nuestro chat
   var $messageForm = $('#sendMessage');
   var $message = $('#message');
   var $chat =$('#chat'); 
   var $listUsers=$('#users');
   

     
   //se envía el mensaje al servidor con el nombre sendMessage
   $messageForm.submit(function(e){
     e.preventDefault();
     if($message.val()!= ''){
       socket.emit('sendMessage',$message.val());              
     }
     $message.val('');
   });
   
   socket.on('output', function(data){
       $chat.append('- '+ data.msg+ "<br>");
     });
   /**
* Cuando el servidor envia la lista de usuarios conectados.
* se reciben a través de este evento,
* cada usuario se agrega a la lista de usuarios online
* @param  users Array con usuarios conectados en el momento
*/
   socket.on('onlineUsers', function (users) {
     console.log(users.length + ' users on');
     for (let i=0; i<users.length; i++) 
     {
       let listOnlineUsers = '<li id="' + users[i] + '">' + users[i]+ '</li>';
       $listUsers.append(listOnlineUsers);
     }
   });
   /**
  * Listener para evento 'new user', el servidor lo emite
  * cuando un usuario se ha conectado
  * @param nuser el usuario recien conectado
  */
   socket.on('newUser', function (nuser) {
     var linuser = '<li id="'+ nuser +'">'+ nuser + '</li>';
     
     $listUsers.append(linuser);
   });

   /**
  * Cada vez que un usuario se desconecta, debemos eliminarlo
  * de la lista de usuarios conectados, el servidor envia un mensaje
  * con este evento para informarnos sobre un usuario desconectado.
  * @param  nuser El usuarios que se acaba de desconectar
  */
   socket.on('remove user', function (nuser) {
     alert(nuser);
     $('#' + nuser).remove();
   });

   /**
  * Cuando el servidor envia los ultimos mensajes registrados
  * se reciben a través de este evento.
  * Cada mensaje se agrega a la lista de mensajes en la vista
  * de la conversación.
  */
  socket.on('latestMessages', function(messages){
    for(var i = messages.length-1; i>=0; i--){
      appendMessage(messages[i]);
    };
  });
  socket.on('latestMessages', function (messages) {
    for (var i = messages.length - 1; i >= 0; i--) {
      var date = moment(new Date(msg.date)).calendar();
      var html = '<div class="small-11">' +
              '<blockquote><h6>' + messages[i].sender + ':</h6>' + 
              msg.message +
              '<cite>' + date + '</cite></blockquote>' +
              '</div>';
                
      $chat.append( html );
    };
  });
  /**
   * Emitimos un evento de tipo 'chat message' cada vez
   * que se presiona 'Enter' en el textarea y enviamos
   * su contenido como mensaje al servidor.
   */
  $message.keyup(function (evt) {
    if (evt.keyCode === 13) {
      var nmsg = {
        username : user._id,
        message : $message.val()
      }
      socket.emit('chat message', nmsg);
      $message.val('');
    }
  });

   /**
  * Solicitamos al servidor la lista de usuarios conectados
  * en este momento.
  */
   socket.emit('onlineUsers');

   /**
  * Emitimos el evento 'newuser' para que el servidor
  * informe a todos los usuarios que estamos en linea.
  */
   socket.emit('newUser', x);
   /**
  * Le solicitamos al servidor los ultimos mensajes del historial
  registrados (máx:70)
  */
  socket.emit('latestMessages');

   
  
 });