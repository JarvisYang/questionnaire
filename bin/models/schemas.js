'use strict';

module.exports = function ( mongoose ){
	var schema;
	schema = {
		counter: new mongoose.Schema({
			_id: { type: String, required: true},
			seq: { type: Number, default: 0 }
		}),
		questionType: new mongoose.Schema({
			_id: Number,
			type: String,
			question: String
		}),
		option: new mongoose.Schema({
			_id: Number,
			questionId: Number,
			value: [{
				id: Number,
				name: String
			}]
		}),
		movieOption: new mongoose.Schema({
			_id: Number,
			movieId: Number,
			movieType: [String],
			value: [{
				id: Number,
				name: String
			}]
		}),
		user: new mongoose.Schema({
			sid: String
		}),
		result: new mongoose.Schema({
			userId: Number,
			optionId: Number,
			value: Number
		}),
		movieResult: new mongoose.Schema({
			userId: Number,
			optionId: Number,
			value: Number
		})
	};

	return schema;
};
