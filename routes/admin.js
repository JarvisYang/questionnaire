var express = require('express');
var router = express.Router();
var db = require('../bin/models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.user.isAdminLogin(req.sessionID).then(function(isLogin) {
    if(isLogin) {
      res.render('admin');
    } else {
      res.redirect('/login?redirect=/admin');
    }
  });
});

module.exports = router;