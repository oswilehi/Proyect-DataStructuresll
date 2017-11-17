var express = require('express');
var router = express.Router();

//Schema
var Message = require('../schemas/messageSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('chat');
});
//Guardar mensajes en la base de datos
router.post('/',function(req,res,next){
    
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
    res.redirect('/');
});
router.get('/getLatest',function(req,res,next){
    var specifications ={
        'sort':[['date','desc']],
        'limit':70
    };
    Message.find({},specifications).toArray(function(err,data){
        if(err) {
            console.log('There was an error (mensajes)');
            return;
        }
        else {
            res.render('chat', {mgs:data});
        }

    })
});
function GetLatestMessages(limit, callback){
    var specifications ={
        'sort':[['date','desc']],
        'limit':limit
    };
    Message.find({},specifications).toArray(function(err,data){
        if(err) return callback(err, null);
        else return callback(null,err);

    })

}


module.exports =router;
