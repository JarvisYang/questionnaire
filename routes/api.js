'use strict';
var express = require('express');
var router = express.Router();
var db = require('../bin/models/index');

router.post('/update/option', function(req, res, next) {
	var optionId = req.body.optionId;
	var optionValue = req.body.values;

	if(typeof(optionId) === 'undefined' || typeof(optionValue) === 'undefined') {
		res.json({
			status: false,
			msg: '参数错误'
		})
	}


	res.json({
		status: true
	});
});
router.post('/update/questiontype', function(req, res, next) {
	var optionId = req.body.optionId;
	var optionValue = req.body.values;

	if(typeof(optionId) === 'undefined' || typeof(optionValue) === 'undefined') {
		res.json({
			status: false,
			msg: '参数错误'
		})
	}


	res.json({
		status: true
	});
});

module.exports = router;