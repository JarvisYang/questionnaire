'use strict';
var express = require('express');
var router = express.Router();
var db = require('../bin/models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
	var sid = req.sessionID;

	db.user.isAdminLogin(sid)
		.then(function(isLogin) {
			let redirectUrl = req.query['redirect'];
			if(isLogin) {
				if(typeof(redirectUrl) !== 'undefined' && /^\/.*$/.test(redirectUrl)) {
					res.redirect(redirectUrl);
				} else {
					res.redirect('/admin');
				}
			} else {
				if(typeof(redirectUrl) !== 'undefined' && /^\/.$/.test(redirectUrl)) {
					res.render('login', {redirectUrl: redirectUrl});
				} else {
					res.render('login', {redirectUrl: '/admin'});
				}
			}
		});

});

router.post('/', function(req, res, next) {
	var loginName = req.body['name'];
	var loginPsw = req.body['password'];
	var redirect = req.body['redirect'];

	if(typeof(loginName) === 'undefined' || typeof(loginPsw) === 'undefined') {
		res.redirect('/login');
	}
	else{
		db.user.isAdmin(loginName, loginPsw)
			.then(function(user) {
				if(user !== null) {
					db.user.addSid(req.sessionID, user['_id']).then(function() {
						res.redirect(redirect);
					});
				} else {
					res.redirect(`/login?redirect=${redirect}`);
				}
			});
	}


});

module.exports = router;