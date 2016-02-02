/**
 * Created by jarvis on 16/1/30.
 */
'use strict';
var db = require('../models/index');
var questionTypeName = require('./questionTypeName');

var	getQuestionInfo = function(queId) {
	if(queId == 4) {
		return getMovieInfo();
	}
	return Promise.all([
		db.questionType.getQuestionTypeById(queId),
		db.option.getOptionByQueId(queId)
	]).then(function(results) {
		var data = {
			question: results[0].question,
			questionId: results[0]['_id'],
			questionName: questionTypeName[results[0].type],
			options: []
		};

		results[1].forEach(function(optionItem) {
			let option = [];
			optionItem.values.sort(function(pre, next) {
				return pre.order - next.order;
			}).forEach(function(value) {
				option.push({
					id: value['_id'],
					order: value.order,
					name: value.name,
					status: value.status
				});
			});
			data.options.push({
				optionInfo: {
					id: optionItem['_id']
				},
				values:option
			});
		});
		return Promise.resolve(data);
	});
};
var getMovieInfo = function() {
	return Promise.all([
		db.questionType.getQuestionTypeById(4),
		db.movieOption.getAllMovieOption()
	]).then(function(results) {
		var data = {
			question: results[0].question,
			questionId: results[0]['_id'],
			questionName: questionTypeName[results[0].type],
			options: []
		};

		results[1].forEach(function(optionItem) {
			let option = [];
			optionItem.values.sort(function(pre, next) {
				return pre.order - next.order;
			}).forEach(function(value) {
				option.push({
					id: value.id,
					order: value.order,
					name: value.name,
					status: value.status
				});
			});
			data.options.push({
				optionInfo: {
					movieId: optionItem.movieId,
					movieType: optionItem.movieType
				},
				values:option
			});
		});

		return Promise.resolve(data);
	});
};
module.exports = {
	getQuestionInfo: getQuestionInfo,
	getMovieInfo: getMovieInfo
};
