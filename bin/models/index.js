/**
 * Created by jarvis on 16/1/18.
 */

var mongoose = require( 'mongoose' );

mongoose.connect(process.env['questionnaireDB']);
var conn = mongoose.connection;
conn.on( 'error', function(e) {
  console.log('db connect error:', e )
});

//var app = require( 'express' )();
var schema = require( './schemas' )( mongoose );
var model = require( './model' )( mongoose, schema );
var counter, questionType, option, movieOption, user, result, movieResult;

counter = {
  getOptionCounter: function(){
    return model.counter.findByIdAndUpdate( 'option', {
        $inc: { seq: 1 }
      },
      {
        upsert: true,
        new: true
      })
  },
  getMovieOptionCounter: function(){
    return model.counter.findByIdAndUpdate( 'movieOption', {
        $inc: { seq: 1 }
      },
      {
        upsert: true,
        new: true
      })
  },
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
    let data = {
      '_id': id,
      'type': type,
      'question': question
    };

    model.questionType.create(data);
  }
};

module.exports = {
  counter, questionType, option, movieOption, user, result, movieResult
};
