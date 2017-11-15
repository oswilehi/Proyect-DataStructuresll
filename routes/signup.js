var express = require('express');
var router = express.Router();


//Schema
var User = require('../schemas/userSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function(req, res, next){

  console.log(req, req.body.emailUser);

  var newUser = User({
    email : req.body.emailUser,
    user : req.body.userName,
    password : req.body.password
  });
  /*newUser.save(function(error, result){
    if(error) throw error
    console.log("guardado")
    console.log(result)
  });*/
});


module.exports = router;