/**
 * Created by jarvis on 8/14/15.
 */
'use strict';
module.exports = function( mongoose, schema ){
    var model;

    model = {
        counter: mongoose.model( 'Counter', schema.counter),
        questionType: mongoose.model( 'QuestionType', schema.questionType ),
        option: mongoose.model( 'Option', schema.option ),
        movieOption: mongoose.model( 'MovieOption', schema.movieOption ),
        user: mongoose.model( 'User', schema.user ),
        result: mongoose.model( 'Result', schema.result ),
        movieResult: mongoose.model( 'MovieResult', schema.movieResult)
    };

    return model;
};
