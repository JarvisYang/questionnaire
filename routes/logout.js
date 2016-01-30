var express = require('express');
var router = express.Router();
var db = require('../bin/models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.user.removeSid(req.sessionID).then(function() {
		res.redirect('/login');
	});
});

module.exports = router;