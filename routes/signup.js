var express = require('express');
var router = express.Router();


//Schema
var User = require('../schemas/userSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/Registrarse', function(req, res, next){

  var newUser = User({
    email : req.body.email,
    user : req.body.user,
    password : req.body.password
  })
  

  console.log(newUser);
  /*newUser.save(function(error, result){
    if(error) throw error
    console.log("guardado")
    console.log(result)
  });*/
});


module.exports = router;