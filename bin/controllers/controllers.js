/**
 * Created by jarvis on 16/1/30.
 */
'use strict';
var db = require('../models/index');
var questionTypeName = require('./questionTypeName');
var mongoose = require('mongoose');
var movieType = require('../controllers/movieType');

function getQuestionInfo(queId) {
	if(queId == 4) {
		return getAllMovieInfo();
	}
	return Promise.all([
		db.questionType.getQuestionTypeByQid(queId),
		db.option.getOptionByQueId(queId)
	]).then(function(results) {
		var data = {
			question: results[0].question,
			questionId: results[0]['id'],
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
					status: value.status,
					delete: value.delete
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
}

function getAllMovieInfo() {
	return Promise.all([
		db.questionType.getQuestionTypeByQid(4),
		db.movieOption.getAllMovieOption()
	]).then(function(results) {
		var data = {
			question: results[0].question,
			questionId: results[0]['id'],
			questionName: questionTypeName[results[0].type],
			options: []
		};

		// var data = {
		// 	question: results[0].question,
		// 	questionId: results[0]['id'],
		// 	questionName: questionTypeName[results[0].type],
		// 	options: [{
		// 		optionInfo: {
		// 			id: 333,
		// 			movieId: 11111,
		// 			movieType: ['动作', '爱情'],
		// 			deleteMovieType: ['动画', '惊悚'],
		// 			movieName: 'hello world',
		// 			delete: true
		// 		},
		// 		values: [{
		// 			id: 11111111111,
		// 			order: 0,
		// 			name: '帅的不要不要的',
		// 			status: false,
		// 			delete: false
		// 		},{
		// 			id: 222222222,
		// 			order: 0,
		// 			name: '帅的不要不要的',
		// 			status: true,
		// 			delete: false
		// 		},{
		// 			id: 11111111111,
		// 			order: 0,
		// 			name: '帅的不要不要的',
		// 			status: false,
		// 			delete: true
		// 		}]
		// 	}, {
		// 		optionInfo: {
		// 			movieId: 11111,
		// 			movieType: ['动作', '爱情'],
		// 			deleteMovieType: ['动画', '惊悚'],
		// 			movieName: 'hello world',
		// 			delete: false
		// 		},
		// 		values: [{
		// 			id: 11111111111,
		// 			order: 0,
		// 			name: '帅的不要不要的',
		// 			status: false,
		// 			delete: false
		// 		},{
		// 			id: 222222222,
		// 			order: 0,
		// 			name: '帅的不要不要的',
		// 			status: true,
		// 			delete: false
		// 		},{
		// 			id: 11111111111,
		// 			order: 0,
		// 			name: '帅的不要不要的',
		// 			status: false,
		// 			delete: true
		// 		}]
		// 	}]
		// };

		results[1].forEach(function(optionItem) {
			let option = [];
			optionItem.values.sort(function(pre, next) {
				return pre.order - next.order;
			}).forEach(function(value) {
				option.push({
					id: value['_id'],
					order: value.order,
					name: value.name,
					status: value.status,
					delete: value.delete
				});
			});
			data.options.push({
				optionInfo: {
					id: optionItem.id,
					movieId: optionItem.movieId,
					movieType: optionItem.movieType,
					movieName: optionItem.movieName
				},
				values:option
			});
		});

		return Promise.resolve(data);
	});
}

function updateOption(optionList) {
	console.log('updateOption');
	let promiseList = optionList.map(function(value) {
		return updateOptionPromise(value);
	});

	return Promise.all(promiseList);
}

function getMovieInfoByMovieId(_movieId) {
	let movieId = Number(_movieId);
	if(isNaN(movieId)) {
		return null;
	}
	let movieData = require('./movieData');
	let movieDataMap = new Map(movieData);

	movieData = undefined;

	if(movieDataMap.has(movieId)){
		return movieDataMap.get(movieId);
	} else {
		return null;
	}
}

function updateOptionPromise(_option) {
	console.log('updateOptionPromise');
	let optionId = _option.optionId;
	let optionObj = {
		delete: new Set(),
		add: [],
		modify: new Map(),
		modifyId: new Set()
	};
	let deleteOptionIdList = _option.deleteList.split(',');
	let optionValuesList = _option.values;

	optionValuesList.forEach(function(item, index) {
		if(typeof(item) === 'object') {
			if(typeof(item.id) !== 'undefined' && item.id !== '') {
				optionObj.modify.set(item.id, item);
				optionObj.modifyId.add(item.id);
			} else {
				optionObj.add.push(item);
			}
		}
	});

	deleteOptionIdList = deleteOptionIdList.length == 1 && deleteOptionIdList[0] == '' ? [] : deleteOptionIdList;

	optionObj.delete = new Set(deleteOptionIdList);

	return db.option.getOptionById(optionId).then(function(option) {
		if(option === null) {
			return Promise.resolve(false);
		} else {
			let optionValues = option.values;
			optionValues.forEach(function(item, index) {
				let itemId = item['_id'];
				if(optionObj.delete.has(itemId.toString())) {
					optionValues[index]['delete'] = true;
				} else if(optionObj.modifyId.has(itemId)) {
					optionValues[index]['name'] = optionObj.modify.get(itemId)['name'] || optionValues[index]['name'];
					optionValues[index]['order'] = optionObj.modify.get(itemId)['order'] || optionValues[index]['order'];
				}
			});

			optionObj.add.forEach(function(item) {
				if(typeof(item) === 'object'
					&& typeof(item.name) !== 'undefined'
					&& item.name !== '' ) {
					optionValues.push({
						name: item.name,
						order: optionValues.length
					});
				}
			});

			return db.option.updateOptionValue(optionId, optionValues).then(function(data) {
				if(data.questionId === 3) {
					movieType.updateOption();
				}

				return data;
			});
			//return new mongoose.schema(option.values).findById('56b2f98959f287172cb6c1ab');
		}
	});
}

module.exports = {
	getQuestionInfo: getQuestionInfo,
	getAllMovieInfo: getAllMovieInfo,
	updateOption: updateOption,
	getMovieInfoByMovieId: getMovieInfoByMovieId
};
