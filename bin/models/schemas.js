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
			_id: Number,
			type: {type: String, unique: true},
			question: String
		})),
		option: new mongoose.Schema(getBaseSchema({
			questionId: {type: Number, unique: true},
			values: [{
				id: {type: Number, unique: true},
				order: {type: Number, unique: true},
				name: {type: String, unique: true}
			}]
		})),
		movieOption: new mongoose.Schema(getBaseSchema({
			movieId: Number,
			movieType: [String],
			status: Boolean,
			values: [{
				id: Number,
				order: Number,
				name: String
			}]
		})),
		user: new mongoose.Schema(getBaseSchema({
			userName: {type: String, default: 'unknown', unique: true},
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
