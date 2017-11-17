var express = require('express');
var router = express.Router();
var sha256 = require('sha256');
//Schema
var User = require('../schemas/userSchema');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', {msg:"", visible: false});
});

router.post('/', function(req, res, next){
  // Verificar que el usuario no exista ya en el chat
  User.find({user: req.body.userName}, function(error, data){
    if (error){

    }
    // Si no se encontro nada, pues se crea el usuario
    else if(!data.length){
      var newUser = User({
        email : req.body.emailUser,
        user : req.body.userName,
        password : sha256(req.body.password)
      });
      newUser.save(function(error, result){
        if(error) throw error;
        console.log("Usuario agregado correctamente");
        console.log(result);
      });  
      res.redirect("/");
    }
    // Si si se encontro algo pues se le dice que elija otro usuario
    else {
      console.log("Este nombre de usuario ya existe, elija otro"); 
      res.render('signup', {msg: "Este nombre de usuario ya existe, elija otro", visible: true});
    }  
  }); 
});


module.exports = router;