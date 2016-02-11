'use strict';
var express = require('express');
var router = express.Router();
var db = require('../bin/models/index');
var controller = require('../bin/controllers/controllers');

router.post('/update/option', function(req, res, next) {
	db.user.isAdminLogin(req.sessionID).then(function(isLogin) {
		if(isLogin) {
			let optionList = req.body.optionList;

			if(typeof(optionList) === 'undefined') {
				res.json({
					status: false,
					msg: '参数错误'
				})
			}

			optionList = JSON.parse(req.body.optionList);

			controller.updateOption(optionList).then(function(data) {
				res.json({
					status: true
				});
			}).catch(function(e) {
				res.json({
					status: true
				});
				console.error(e)
			});
		}
		else{
			res.json({
				status: false,
				msg: '用户未登录'
			})
		}
	});
});
router.post('/update/questiontype', function(req, res, next) {
	db.user.isAdminLogin(req.sessionID).then(function(isLogin) {
		if(isLogin) {
			let questionId = Number(req.body.questionId);
			let question = req.body.question;

			if(isNaN(questionId) || typeof(question) === 'undefined') {
				res.json({
					status: false,
					msg: '参数错误'
				})
			}

			db.questionType.updateQuestionType(questionId, question).then(function(data) {
				res.json({
					status: true
				});
			}).catch(function(e) {
				res.json({
					status: false,
					msg: e
				})
			});
		}
		else{
			res.json({
				status: false,
				msg: '用户未登录'
			})
		}
	});
});

module.exports = router;