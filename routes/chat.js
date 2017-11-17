var express = require('express');
var router = express.Router();


//Schema
var Message = require('../schemas/messageSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('chat', {arrayMsg:""});
});

//Guardar mensajes en la base de datos
router.post('/',function(req,res,next){
    console.log('Entró a registrar el nuevo msg');
    var newMessage = Message({
        message : req.body.message,
        sender : req.body.sender,
        receiver: req.body.receiver,
        date: Date.now(jsonDate),
        privateKey :""
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
    Message.find({}, function(error, data){
        if(error) throw error;
        else if(!data.length){
            console.log("DB vacía, no hay chats");
            res.render('chat', {arrayMsg: "0"});
        }            
        else{
            console.log("Db con mensajes entre " + values[0] + " y " +values[1]);
            console.log(data);
            res.render('chat', {arrayMsg: data});
            
        }
            
    });
}); 

module.exports =router;
