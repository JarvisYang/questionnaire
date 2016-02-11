/**
 * Created by jarvis on 16/1/30.
 */
'use strict';
var db = require('../models/index');
var questionTypeName = require('./questionTypeName');
var mongoose = require('mongoose');

function getQuestionInfo(queId) {
	if(queId == 4) {
		return getMovieInfo();
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

function getMovieInfo() {
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

		results[1].forEach(function(optionItem) {
			let option = [];
			optionItem.values.sort(function(pre, next) {
				return pre.order - next.order;
			}).forEach(function(value) {
				option.push({
					id: value.id,
					order: value.order,
					name: value.name,
					status: value.status,
					delete: value.delete
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
}

function updateOption(optionList) {
	console.log('updateOption');
	let promiseList = optionList.map(function(value) {
		return updateOptionPromise(value);
	});

	return Promise.all(promiseList);
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

			return db.option.updateOptionValue(optionId, optionValues);
			//return new mongoose.schema(option.values).findById('56b2f98959f287172cb6c1ab');
		}
	});
}

module.exports = {
	getQuestionInfo: getQuestionInfo,
	getMovieInfo: getMovieInfo,
	updateOption: updateOption
};
