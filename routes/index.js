'use strict';
var express = require('express');
var router = express.Router();
var question = '以下电影名字你对哪一个更感兴趣：';
var data = {
  optionList: [
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: '性别：',
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '男'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '女'
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: '年级：',
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '大一'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '大二'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '大三'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '大四'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '大五'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '研一'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '研二'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '研三'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '博士'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '博士后'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '工作'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '其他'
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: '专业：',
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '哲学'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '经济学'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '管理学'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '法学'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '教育学'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '文学'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '历史学'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '理学'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '工学'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '农学'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '医学'
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: '你喜欢以下哪种电影类型：',
      inputType: 1,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '惊悚'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '动作'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '喜剧'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '科幻'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '悬疑'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '爱情'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '动画'
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: '犯罪'
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    },
    {
      optionId: '56bc41b172a1b15cfc2c815e',
      question: question,
      inputType: 0,
      valueList: [
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        },
        {
          valueId: '56bc41b172a1b15cfc2c815e',
          valueName: ''
        }
      ]
    }
  ]
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', data);
});

module.exports = router;
