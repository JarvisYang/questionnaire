'use strict';
var express = require('express');
var router = express.Router();
var db = require('../bin/models/index');
var controller = require('../bin/controllers/controllers');
var questionTypeName = require('../bin/controllers/questionTypeName');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.user.isAdminLogin(req.sessionID).then(function(isLogin) {
    if(isLogin) {
      let questionId = req.query['qid'];
	    questionId = typeof(questionId) === 'undefined'? 4: questionId;
	    questionId = questionId > 4 || questionId < 1? 1: questionId;

	    Promise.all([
		    db.questionType.getAllQuestionType(),
		    controller.getQuestionInfo(questionId)
	    ]).then(function(results) {
			  let questionType = [];

		    results[0].forEach(function(value, index) {
			    questionType.push({
				    id: value.id,
						type: value.type,
				    name: questionTypeName[value.type]
			    });
		    });

		    res.render('admin', {
			    questionTypeList: questionType,
			    questionInfo: results[1],
			    questionId: questionId
		    });
	    }).catch(function(e) {
		    console.error(e);
	    });
    } else {
      res.redirect('/login?redirect=/admin');
    }
  });
});

module.exports = router;