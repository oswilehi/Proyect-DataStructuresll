var express = require('express');
var router = express.Router();
var sha256 = require('sha256');
//https://www.npmjs.com/package/jsonwebtoken
var jwt = require('jsonwebtoken');

//Schema
var User = require('../schemas/userSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { msg: "", visible: false });
});

router.post('/', function(req, res, next){
  // Verificar que el usuario exista ya en el chat
  User.find({user: req.body.username}, function(error, data){
    if (error){

    }
    // Si no se encontro nada, pues se le dice al usuario que pruebe de nuevo
    else if(!data.length){
      res.render('login', {msg : "Su usuario o contraseña no son correctos, pruebe de nuevo", visible: true});
    }
    // Si si se encontro algo pues se verifica su contrasena
    else {
      // Si la contrasena typeada coincide con la guardada se le permite el acceso al chat
      if (sha256(req.body.password) === data[0].password){
          var token = jwt.sign({user: req.body.username}, "passwordForJWT");
          var prueba = jwt.verify(token, "passwordForJWT");
          console.log(prueba);
          res.render('chat', {token : token.toString(), actualUser: req.body.username});
      }
          
      else
          res.render('login', {msg : "Su usuario o contraseña no son correctos, pruebe de nuevo", visible: true});
    }  
  }); 
});

module.exports = router;
