/**
 * Created by jarvis on 16/4/24.
 */
'use strict';
var co = require('co');
var db = require('../models/index');
let movieType = [];

function getAllMovieType() {
	return co(function*() {
		if(movieType.length === 0) {
			let movieTypeMap = yield db.option.getMovieType();

			movieType = Array.from(movieTypeMap.keys());
		}
		
		return movieType;
	});
}

function getMovieType(type) {
	return co(function*() {
		if(typeof  type !== 'string') {
			return '';
		} else {
			let types = yield getAllMovieType();
			let typesSet = new Set(types);
			
			if(type === '恐怖') {
				type = '惊悚';
			}
			
			if(typesSet.has(type)) {
				return type;
			} else {
				return '';
			}
		}
	});
}

function updateMovieType() {
	return getAllMovieType().then();
}

module.exports = {
	getAllMovieType,
	getMovieType,
	updateMovieType
};