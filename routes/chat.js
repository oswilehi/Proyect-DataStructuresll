var express = require('express');
var router = express.Router();

//Schema
var Message = require('../schemas/messageSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('chat', {mgs:""});
});

//Guardar mensajes en la base de datos
router.post('/',function(req,res,next){
    console.log('Entró a registrar el nuevo msg');
    var newMessage = Message({
        message : req.body.message,
        sender : "String",
        receiver: "String",
        date: Date.now(),
        privateKey :"f"        
    });
    newMessage.save(function(error, result){
        if(error)throw error;
        console.log("The message was succesfull added");
        console.log(result);
    });
    res.status(204).end();
});

module.exports =router;
