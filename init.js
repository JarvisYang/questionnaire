/**
 * Created by jarvis on 16/1/18.
 */
var db = require('./bin/models/index');
var setting = require('./setting');

var questionList = [
	// {
	// 	id: 0,
	// 	question: '性别：',
	// 	type: 'sex',
	// 	option: ['男', '女']
	// },
	// {
	// 	id: 1,
	// 	question: '年级：',
	// 	type: 'grade',
	// 	option: ['大一', '大二', '大三', '大四', '大五', '研一', '研二', '研三', '博士', '博士后', '工作', '其他']
	// },
	// {
	// 	id: 2,
	// 	question: '专业：',
	// 	type: 'major',
	// 	option: ['哲学', '经济学', '管理学', '法学', '教育学', '文学', '历史学', '理学', '工学', '农学', '医学']
	// },
	{
		id: 3,
		question: '你喜欢以下哪种电影类型：',
		type: 'movieType',
		option: ['惊悚', '动作', '喜剧', '科幻', '悬疑', '爱情', '动画', '犯罪']
	},
	{
		id: 4,
		question: '以下电影名字你对哪一个更感兴趣：',
		type: 'movie'
	}
];

var flowMap = questionList.map(function(value, index) {
	return db.questionType.createQuestionType(value.id, value.question, value.type);
})
.concat(questionList.map(function(value, index) {
	if(typeof(value.option) != 'undefined') {
		return db.option.createOption(value.id, value.option)
	}
	else{
		return Promise.resolve();
	}
}))
.concat(db.user.createUser(setting.admin.name, setting.admin.password, 1));

Promise.all(flowMap)
	.then(function(results) {
		console.log(results)
		console.log('init data done');
		process.exit();
	})
	.catch(function(error) {
		console.error(error);
		process.exit();
	});

