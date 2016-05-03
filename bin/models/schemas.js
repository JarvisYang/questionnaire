'use strict';

function getBaseSchema(obj) {
	if(typeof(obj.updateAt) == 'undefined') {
		obj.updateAt = {
			type: Date,
			default: Date.now};
	}

	if(typeof(obj.createAt) == 'undefined') {
		obj.createAt = {
			type: Date,
			default: Date.now};
	}

	return obj;
}

module.exports = function ( mongoose ){
	var schema;
	schema = {
		counter: new mongoose.Schema(getBaseSchema({
			_id: { type: String, required: true},
			seq: { type: Number, default: 0 }
		})),
		questionType: new mongoose.Schema(getBaseSchema({
			qid: {type: Number, unique: true},
			type: {type: String, unique: true},
			question: String
		})),
		option: new mongoose.Schema(getBaseSchema({
			questionId: {type: Number, unique: true},
			status: {type: Boolean, default: true},
			values: [{
				//id: {type: mongoose.Schema.Types.ObjectId, unique: true},
				order: {type: Number},
				name: {type: String, default: ''},
				status: {type: Boolean, default: false},
				delete: {type: Boolean, default: false}
			}]
		})),
		movieOption: new mongoose.Schema(getBaseSchema({
			movieId: Number,
			movieType: String,
			deleteMovieType: [String],
			status: Boolean,
			movieName: String,
			delete: {type: Boolean, default: false},
			values: [{
				//id: {type: Number, unique: true},
				order: {type: Number, default: 0},
				name: {type: String},
				status: {type: Boolean, default: false},
				delete: {type: Boolean, default: false}
			}]
		})),
		user: new mongoose.Schema(getBaseSchema({
			userName: {type: String, default: 'unknown'},
			psw: String,
			sid: [String],
			priority: {type: Number, default : 0}
		})),
		session: new mongoose.Schema(getBaseSchema({
			userId: mongoose.Schema.Types.ObjectId,
			sessionId: String
		})),
		result: new mongoose.Schema(getBaseSchema({
			userId: Number,
			optionId: Number,
			value: Number
		})),
		movieResult: new mongoose.Schema(getBaseSchema({
			userId: Number,
			optionId: Number,
			values: [Number]
		}))
	};

	for(let item in schema) {
		if(schema.hasOwnProperty(item)) {
			schema[item].pre('update', function() {
				this.update({},{ $set: { updatedAt: new Date() } });
			});

		}

	}

	return schema;
};
