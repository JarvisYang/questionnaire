/**
 * Created by jarvis on 16/1/18.
 */

require('./bin/models/index');

var questionList = [
	{
		id: 0,
		question: '性别：',
		type: 'sex',
		option: []
	},
	{
		id: 1,
		question: '年级：',
		type: 'grade',
		option: ['大一', '大二', '大三', '大四', '大五', '研一', '研二', '研三', '博士', '博士后', '工作', '其他']
	},
	{
		id: 2,
		question: '专业：',
		type: 'major',
		option: ['哲学', '经济学', '管理学', '法学', '教育学', '文学', '历史学', '理学', '工学', '农学', '医学']
	},
	{
		id: 3,
		question: '一下电影名字你对哪一个更感兴趣：',
		type: 'movie'
	}
];

process.exit();
