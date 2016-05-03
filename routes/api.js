'use strict';
var express = require('express');
var router = express.Router();
var db = require('../bin/models/index');
var controller = require('../bin/controllers/controllers');
var co = require('co');

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
		} else {
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

router.post('/movie/option/update', function(req, res, next) {
	co(function*() {
		var isLogin = db.user.isAdminLogin(req.sessionID);
		if(!isLogin) {
			return Promise.reject(new Error('用户未登录'));
		}


		let body = req.body;
		let optionId = body.optionId;
		let movieId = body.movieId;
		let movieType = body.movieType;
		let movieEnName = body.enName;
		let chNameList;

		try{
			chNameList = JSON.parse(body.chNameList);
		} catch(err) {
			chNameList = null;
			console.error(err);
		}

		if(typeof optionId !== 'string'
			|| typeof movieId !== 'string'
			|| /^[0-9]+$/.test(movieId) === false
			|| typeof movieType !== 'string'
			|| typeof movieEnName !== 'string'
			|| !Array.isArray(chNameList)
			|| chNameList.length < 3) {

			return Promise.reject(new Error('参数错误'));
		}

		try{
			if(optionId === '') {
				return db.movieOption.create({
					optionId,
					movieId,
					movieType,
					enName: movieEnName,
					chNameList
				})
			} else {
				return db.movieOption.update({
					optionId,
					movieType,
					enName: movieEnName,
					chNameList
				});
			}
		} catch(err) {
			return Promise.reject(err);
		}
		
	}).then(function(data) {
		res.json({
			data: data,
			status: true
		});
	}).catch(function(err) {
		console.log(err);
		res.json({
			status: false,
			msg: err.message
		});
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
						movieType.push(tagInfo['name']);
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
				console.error(err);
				res.json({
					status: false,
					msg: err.message
				});
			});
		}
	}

});

router.post('/movie/option/delete', function(req, res, next) {
	co(function*() {
		var isLogin = db.user.isAdminLogin(req.sessionID);

		if(!isLogin) {
			return Promise.reject(new Error('用户未登录'));
		}
		
		let optionId = req.body.id;
	
		console.log(optionId)
		if(optionId === null || optionId === undefined) {
			return Promise.reject(new Error('参数错误'));
		}
		return db.movieOption.delete(optionId);

	}).then(function(data) {
		if(data.delete) {
			res.json({
				status: true,
				data: data
			});
		} else {
			res.json({
				status: false,
				msg: '无法删除'
			});
		}
	}).catch(function(err) {
		console.error(err);
		res.json({
			status: false,
			msg: err.message
		});
	});
});

module.exports = router;