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

router.get('/movie/info/get', function(req, res, next) {
	let movieId = req.query['movieId'];

	if(movieId === undefined) {
		res.json({
			status: false,
			msg: '参数错误'
		});
	} else {
		let movieInfo = controller.getMovieInfoByMovieId(movieId);

		if(movieId === null) {
			res.json({
				status: false,
				msg: `无该电影信息(${movieId})`
			});
		} else {
			db.option.getMovieType().then(function(movieTypeMap) {
				let tagList = movieInfo.tags.replace(/\s/g, '').split(',');
				let movieType = [];
				let chName = movieInfo['ch-name'].split('/').map(function(name) {
					return name.replace(/^\s+/, '').replace(/\s+$/, '');
				});

				tagList.forEach(function(tagName) {
					tagName = tagName == '恐怖'? '惊悚': tagName;
					//console.log(movieTypeMap, movieTypeMap.has(tagName), movieTypeMap.get(tagName).delete)
					if(movieTypeMap.has(tagName) && movieTypeMap.get(tagName).delete === false) {
						let tagInfo = movieTypeMap.get(tagName);
						movieType.push({
							id: tagInfo['_id'],
							typeName: tagInfo['name']
						});
					}
				});

				res.json({
					status: true,
					data: {
						movieId: movieInfo.id,
						chNameList: chName,
						enName: movieInfo['en-name'],
						movieTypes: movieType
					}
				});
			}, function(err) {
				console.error(err)
				res.json({
					status: false,
					msg: err.message
				});
			});
		}
	}

});

module.exports = router;