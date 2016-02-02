/**
 * Created by jarvis on 16/1/18.
 */
'use strict';
var mongoose = require( 'mongoose' );
var setting = require('../../setting');
var getCryptoStr = require('../controllers/getCryptoStr');

mongoose.connect(setting.dbUrl);
var conn = mongoose.connection;
conn.on( 'error', function(e) {
  console.log('db connect error:', e )
});

//var app = require( 'express' )();
var schema = require( './schemas' )( mongoose );
var model = require( './model' )( mongoose, schema );
var counter, questionType, option, movieOption, user, result, movieResult;

counter = {
  //getOptionCounter: function(){
  //  return model.counter.findByIdAndUpdate( 'option', {
  //      $inc: { seq: 1 }
  //    },
  //    {
  //      upsert: true,
  //      new: true
  //    })
  //},
  //getMovieOptionCounter: function(){
  //  return model.counter.findByIdAndUpdate( 'movieOption', {
  //      $inc: { seq: 1 }
  //    },
  //    {
  //      upsert: true,
  //      new: true
  //    })
  //},
  getQuestionTypeCounter: function(){
    return model.counter.findByIdAndUpdate( 'questionType', {
        $inc: { seq: 1 }
      },
      {
        upsert: true,
        new: true
      })
  }
};

questionType = {
  createQuestionType: function(id, question, type) {
    return model.questionType.findByIdAndUpdate(id, {
        'type': type,
        'question': question
      },
      {
        upsert: true,
        new: true
      });
  },
	getQuestionTypeById: function(id) {
		return model.questionType.findById(id);
	},
	getAllQuestionType: function() {
		return model.questionType.find();
	}
};

option = {
  createOption: function(questionId, optionValues) {
    if(optionValues instanceof Array || typeof(optionValues) == 'string') {
      if( typeof(optionValues) == 'string') {
        optionValues = [optionValues];
      }
      var newOptionValues = [];

      for(let i = 0; i < optionValues.length; i++) {
        newOptionValues.push({
          id: i,
          order: i,
          name: optionValues[i]
        })
      }

      return model.option.findOneAndUpdate({
          questionId: questionId
        },
        {
          values: newOptionValues
        },
        {
          upsert: true,
          new: true
        });
    } else {
      return Promise.reject(new Error('model/index.js: invalid parameters'));
    }
  },
	updateOption: function(optionId, values) {
		return model.option.findById(optionId);
	},
	getOptionByQueId: function(questionId) {
		return model.option.find({
			questionId: questionId
		})
	}
};

movieOption = {
	getAllMovieOption: function() {
		return model.movieOption.find();
	}
};

user = {
  createUser: function(userName, psw, priority) {
    userName = userName || 'unknown';
    psw = psw || '';
    priority = priority || 0;
    return model.user.findOneAndUpdate({
        userName: userName
      },
      {
        $set: {
          psw: getCryptoStr(psw),
          priority: priority
        }
      },
      {
        upsert: true,
        new: true
      });
  },
	addSid: function(sid) {
		return model.user.findOneAndUpdate({
				userName: setting.admin.name
			},
			{
				$addToSet: {
					sid: sid
				}
			},
			{
				upsert: true,
				new: true
			});
	},
	removeSid: function(sid) {
		return model.user.findOneAndUpdate({
				userName: setting.admin.name
			},
			{
				$pull: {
					sid: sid
				}
			},
			{
				upsert: true,
				new: true
			});
	},
	isAdmin: function(userName, userPsw) {
		if(typeof(userName) == 'undefined' || typeof(userPsw) == 'undefined' || userName != setting.admin.name) {
			return Promise.resolve(null);
		}

		return model.user.findOne({
			userName: userName,
			psw: getCryptoStr(userPsw)
		});
	},
  isAdminLogin: function(sid) {
    return model.user.findOne({
      userName: setting.admin.name,
      sid: sid
    }).then(function(user) {
      if(user == null) {
        return Promise.resolve(false);
      }
      else{
        return Promise.resolve(true);
      }
    });

  }
};

module.exports = {
  counter, questionType, option, movieOption, user, result, movieResult
};
