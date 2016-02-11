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
      let _questionId = Number(req.query['qid']);
	    let questionId = isNaN(_questionId)? 4: _questionId;
	    questionId = questionId > 4 || questionId < 0? 0: questionId;

	    if(questionId !== _questionId) {
		    res.redirect(`/admin/?qid=${questionId}`);
	    }

	    Promise.all([
		    db.questionType.getAllQuestionType(),
		    controller.getQuestionInfo(questionId)
	    ]).then(function(results) {
			  let questionType = [];

		    results[0].forEach(function(value, index) {
			    questionType.push({
				    id: value.qid,
						type: value.type,
				    name: questionTypeName[value.type]
			    });
		    });

		    if(questionId === 4) {
			    res.render('admin-1', {
				    questionTypeList: questionType,
				    questionInfo: results[1],
				    questionId: questionId
			    });
		    } else {
			    res.render('admin', {
				    questionTypeList: questionType,
				    questionInfo: results[1],
				    questionId: questionId
			    });
		    }
	    }).catch(function(e) {
		    console.error(e);
	    });
    } else {
      res.redirect('/login?redirect=/admin');
    }
  });
});

module.exports = router;