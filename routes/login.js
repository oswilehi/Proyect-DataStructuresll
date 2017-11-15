var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Probando el servidor' });
});
//para que empiece el io en el chat:
//require('./chat.js')()
module.exports = router;
