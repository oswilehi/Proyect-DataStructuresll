var express = require('express');
var router = express.Router();

//Edge
var edge = require('edge');

//Schema
var Message = require('../schemas/messageSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('chat', {mgs:""});
});

//Guardar mensajes en la base de datos
router.post('/',function(req,res,next){
    console.log('Entró a registrar el nuevo msg');
    console.log(req.body);

    var messageEncrypted;
    var cifrar = edge.func({
        // Ruta de la carpeta donde se encuentra la dll
        assemblyFile: 'DLLs/Cifrar2.dll',
        // namespace y nombre de la clase
        typeName : "Cifrar.RSA",
        methodName : "encryptWord"
      })
    
      var descifrar = edge.func({
        assemblyFile: 'DLLS/Cifrar.dll',
        typeName : "Cifrar.RSA",
        methodName : "deencryptedWord"
      })
    
      console.log(req.body.message);
      cifrar(req.body.message, function(error, result) {
            if (error) throw error;
            messageEncrypted = result;                
      });

      var values = messageEncrypted.split("|");
    var newMessage = Message({
        message : values[1],
        sender : req.body.sender,
        receiver: req.body.receiver,
        date: Date.now(),
        privateKey : values[0]
    });
    newMessage.save(function(error, result){
        if(error)throw error;
        console.log("The message was succesfull added");
        console.log(result);
    });
    res.status(204).end();
});
router.get('/:content', function(req, res, next){
    
    let values = req.params.content.split("&&");
    console.log("está buscando ambos usuarios:  " + values[0] + " " + values[1]);
    Message.find({sender: values[0], receiver: values[1] }, function(error, data){
        if(error) throw error;
        else if(!data.length){
            console.log("DB vacía, no hay chats");
            res.render('chat', {arrayMsg: "0"});
        }            
        else{
            console.log("Db con mensajes entre " + values[0] + " y " +values[1]);
            res.render('chat', {arrayMsg: data});
            
        }
            
    });
}); 

module.exports =router;
