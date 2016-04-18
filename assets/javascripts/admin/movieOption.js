/**
 * Created by jarvis on 16/1/30.
 */

require('./commons');

require('../../stylesheets/admin/movieOption.less');

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
	setOptionItemModify: function(optionInput) {
		var optionIpt = $(optionInput);
		var optionNameValue = optionIpt.val();
		var optionNameOriginValue = optionIpt.parent()
	},
	checkOptionList: function() {
	},
	getOptionList: function() {
	},
	getOptionItemTpl: function(data, optionIndex) {
		let movieTypeTpl = '';
		let chNameTpl = '';
		data.movieTypes.forEach(function(type) {
			movieTypeTpl += `<li class="movie-type-item" data-id="${type.id}"><span class="movie-type-name">${type.typeName}</span><a href="javascript:void(0)" class="movie-type-delete-btn">x</a></li>`;
		});
		data.chNameList.forEach(function(chName, index) {
			chNameTpl += `
    		<li data-id="<%= optionValue.id%>" class="movie-ch-name-item">
    			<input type="checkbox" id="option-status-checkbox-hide-${optionIndex}-${index}" class="option-status-checkbox-hide"/>
    			<label class="option-status-checkbox-show" for="option-status-checkbox-hide-${optionIndex}-${index}"></label>
    			<span class="ch-name">${chName}</span>
    			<a href="javascript:void(0)" class="movie-ch-name-delete-btn">x</a>
    		</li>
			`;
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
		return `<li data-id="<%= option.optionInfo.id %>" class="option-item new-option-item">
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

		})
	}
};

index.init();