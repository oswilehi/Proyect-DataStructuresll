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
        sender : req.body.sender,
        receiver: req.body.receiver,
        date: Date.now(),
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
    console.log("está buscando ambos usuarios");
    var root = req.params;
    
    Message.find({sender: root, receiver: req.body.receiver }, function(error, data){
        if(error) throw error;
        else
            res.sender('chat', {arrayMsg: data});
    });
});

module.exports =router;
