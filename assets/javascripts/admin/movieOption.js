/**
 * Created by jarvis on 16/1/30.
 */

require('./commons');

require('../../stylesheets/admin/movieOption.less');
var MOVIE_NAME_COUNT = 3;

var index = {
	init: function() {
		this.questionContainer = $('.question-container');
		this.questionSaveBtn = this.questionContainer.find('.submit-modify-btn');
		this.addNewOptionItemBtn = $('.add-option-item-btn');
		this.optionSaveBtn = $('.option-save-btn');
		this.questionId = Number($('.nav-item-active').data('id'));
		this.getOptionList();
		this.bind();
	},
	updateQuestion: function() {
		var self = this;
		$.ajax({
			type: 'POST',
			url: '/api/update/questiontype',
			data: {
				question: $('.question-text').val(),
				questionId: self.questionId
			},
			success: function(data) {
				if(data.status) {
					alert('保存成功');
				}
				else{
					alert(data.msg);
				}
			},
			error: function(e) {
				alert(e);
			}
		});
	},
	updateOption: function() {
		var self = this;
		if(self.checkOptionList()) {
			alert('选项为空或重复');
			return false;
		}
		$.ajax({
			type: 'POST',
			url: '/api/update/option',
			data: {
				optionList: JSON.stringify(self.getOptionList())
			},
			success: function(data) {
				if(data.status) {
					alert('保存成功');
				}
				else{
					alert(data.msg);
				}
			},
			error: function(e) {
				alert(e);
			}
		})
	},
	checkOptionList: function() {
	},
	getOptionList: function() {
	},
	getOptionItemTpl: function(data, optionIndex) {
		let movieTypeTpl = '';
		let chNameTpl = '';
		data.movieTypes.forEach(function(type) {
			movieTypeTpl += `<li class="movie-type-item"><span class="movie-type-name">${type}</span><a href="javascript:void(0)" class="movie-type-delete-btn">x</a></li>`;
		});
		data.chNameList.forEach(function(item, index) {
			if(typeof  item === 'string') {
				chNameTpl += `
    		<li data-id="" class="movie-ch-name-item movie-ch-name-item-show">
    			<input type="checkbox" class="option-status-checkbox"/>
    			<span class="ch-name">${item}</span>
    			<a href="javascript:void(0)" class="movie-ch-name-delete-btn">x</a>
    		</li>
			`;
			} else {
				chNameTpl += `
    		<li data-id="${item['_id']}" class="movie-ch-name-item movie-ch-name-item-${item.delete?'delete':'show'}">
    			<input type="checkbox" ${item.status?'checked':''} class="option-status-checkbox"/>
    			<span class="ch-name">${item.name}</span>
    			<a href="javascript:void(0)" class="movie-ch-name-delete-btn">x</a>
    		</li>
			`;
			}
		});
		return `<div class="row movie-id-row">
    	<span class="name">电影ID：</span><span class="movie-id-text">${data.movieId}</span><span class="movie-en-name">${data.enName}</span>
    </div>
    <div class="row movie-type-row">
    	<p class="name">电影类型：</p>
    	<ul class="movie-type-list">${movieTypeTpl}</ul>
    </div>
    <div class="row movie-name-row">
    	<p class="name">电影中文名：</p>
    	<ul class="movie-ch-name-list">${chNameTpl}</ul>
    </div>
		`;
	},
	getNewOptionItemTpl: function(data) {
		return `<li data-id="" class="option-item new-option-item">
    <div class="item-header">
    	<span class="option-index">${$('.option-item').length + 1}.</span>
    	<button class="option-item-save-btn header-btn">保存</button>
    	<button class="option-item-delete-btn header-btn">删除</button>
    </div>
    <div class="question-info">
    	<div class="row movie-id-row">
      	<span class="name">电影ID：</span><input type="text" class="movie-id-ipt" value=""/><button class="add-movie-id-btn">添加</button>
      </div>
     </div>
    </li>`;
	},
	setOptionItemModify: function(_node) {
		var $node = $(_node);

		if($node.hasClass('option-item')) {
			$node.addClass('option-item-modify');
		} else {
			let parentNode = $node.closest('.option-item');
			
			if(parentNode.length > 0) {
				parentNode.addClass('option-item-modify');
			} else {
				console.log('option-item not found');
			}
		}
	},
	resetOptionOrder: function() {
		$('.option-item').each(function(index, item) {
			$(item).find('.option-index').html(index + 1 +'.')
		});
	},
	bind: function() {
		var self = this;

		self.questionSaveBtn.on('click', function(e) {
			self.updateQuestion();
		});
		self.optionSaveBtn.on('click', function(e) {
			self.updateOption();
		});
		self.addNewOptionItemBtn.on('click', function(e) {
			$('.option-list').append(self.getNewOptionItemTpl());
		});
		$(document).on('click', '.add-movie-id-btn', function() {
			let parentNode = $(this).parents('.new-option-item');
			let optionIndex = parentNode.data('optionIndex');
			try{
				let movieId = parentNode.find('.movie-id-ipt').val();
				if(movieId === '' ||! /^[0-9]{5,10}$/.test(movieId)) {
					alert('id错误');
				} else {
					$.ajax({
						type: 'GET',
						url: '/api/movie/info/get',
						data: {
							movieId: movieId
						},
						success: function(data) {
							if(data.status) {
								parentNode.removeClass('new-option-item');
								parentNode.addClass('option-item-modify');
								parentNode.find('.question-info').html(self.getOptionItemTpl(data.data, optionIndex));
							}
							else{
								alert(data.msg);
							}
						},
						error: function(e) {
							alert(e.message);
						}
					});
				}
			} catch(err) {
				alert(err.message);
			}
		});

		$(document).on('click', '.movie-type-delete-btn', function() {
			let parentNode = $(this).parents('.movie-type-item');
			let listNode = $(this).parents('.movie-type-list');
			if(parentNode.length > 0 && listNode.length > 0) {
				if(listNode.find('.movie-type-item').length >= 2 ) {
					self.setOptionItemModify(this);
					parentNode.remove();
				} else {
					alert('必须保留一个类型');
				}
			} else {
				alert('节点获取错误')	
			}
		});
		$(document).on('click', '.movie-ch-name-delete-btn', function() {
			let parentNode = $(this).parents('.movie-ch-name-item');
			let listNode = $(this).parents('.movie-ch-name-list');
			
			if(parentNode.length > 0 && listNode.length > 0 ) {
				if(listNode.find('.movie-ch-name-item-show').length > MOVIE_NAME_COUNT) {
					parentNode.removeClass('movie-ch-name-item-show');
					parentNode.addClass('movie-ch-name-item-delete');
					self.setOptionItemModify(this);
				} else {
					alert('至少保留两个电影名');
				}
			} else {
				alert('节点获取错误')	
			}
		});

		$(document).on('click', '.option-status-checkbox', function() {
			self.setOptionItemModify(this);
		});
		$(document).on('click', '.option-item-save-btn', function() {
			let $parent = $(this).parents('.option-item');
			
			if($parent.length > 0 ) {
				let isLoading  = $parent.attr('data-loading');
				if(isLoading !== null && isLoading !== 'false') {
					return false;
				}

				let movieTypeEle = $parent.find('.movie-type-name');
				if(movieTypeEle.length === 0) {
					alert('缺少电影类型');
					return false;
				} else if(movieTypeEle.length > 1) {
					alert('最多只能有一个电影类型');
					return false;
				}

				let optionListEle = $parent.find('.movie-ch-name-item');
				let optionShowListEle = $parent.find('.movie-ch-name-item-show');
				if(optionShowListEle.length < MOVIE_NAME_COUNT) {
					alert(`最少保证${MOVIE_NAME_COUNT}个电影名字`);
					return false;
				}
				
				$parent.attr('data-loading', true);
				
				let movieType = movieTypeEle.html();
				let optionId = $parent.attr('data-id');
				let movieId = $parent.find('.movie-id-text').html();
				let enName = $parent.find('.movie-en-name').html();
				let chNameList = optionListEle.reduce(function(pre, next) {
					let $next = $(next);
					let isDelete = $next.hasClass('movie-ch-name-item-delete');
					let status = $next.find('.option-status-checkbox').get(0).checked;
					let movieName = $next.find('.ch-name').html();
					let id = $next.attr('data-id');
					
					pre.push({
						delete: isDelete,
						id,
						status,
						name: movieName
					});
					
					return pre;
				}, []);

				$.ajax({
					type: 'POST',
					url: '/api/movie/option/update',
					data: {
						movieType,
						optionId,
						movieId,
						enName,
						chNameList: JSON.stringify(chNameList)
					},
					success: function(data) {
						console.log(data);
						if(data.status) {
							$parent.removeClass('option-item-modify');
							$parent.attr('data-id', data.data._id);
							$parent.find('.question-info').html(self.getOptionItemTpl({
								chNameList: data.data.values,
								enName: data.data.movieName,
								movieId: data.data.movieId,
								movieTypes: [data.data.movieType]
							}));
						} else {
							alert(data.msg);
						}
						$parent.attr('data-loading', false);
					},
					error: function(err) {
						$parent.attr('data-loading', false);
						alert(err);
					}
				});
			} else {
				alert('节点获取错误');
			}
		});

		$(document).on('click', '.option-item-delete-btn', function() {
			let $parent = $(this).parents('.option-item');
			
			if($parent.length === 0) {
				alert('节点获取错误');
				return false;
			}
			let optionId = $parent.attr('data-id');
			if(optionId === '') {
				$parent.remove();
				return true;
			}
			
			let isLoading = $parent.attr('data-loading') || false;
			
			if(isLoading) {
				return false;
			}
			
			$parent.attr('data-loading', true);
			
			$.ajax({
				type: 'POST',
				url: '/api/movie/option/delete',
				data: {
					id: optionId
				},
				success: function(data) {
					if(data.status) {
						$parent.remove();
						self.resetOptionOrder();
					} else {
						$parent.attr('data-loading', false);
						alert(data.msg);
					}
				},
				error: function(err) {
					$parent.attr('data-loading', false);
					alert(err);
				}
			});
			
		});
	}
};

index.init();