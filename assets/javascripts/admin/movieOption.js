/**
 * Created by jarvis on 16/1/30.
 */

require('./commons');

require('../../stylesheets/admin/movieOption.less');

var index = {
	init: function() {
		this.optionValueListContainer = $('.option-value-list-container');
		this.questionContainer = $('.question-container');
		this.questionSaveBtn = this.questionContainer.find('.submit-modify-btn');
		this.optionSaveBtn = $('.option-save-btn');
		this.questionId = Number($('.nav-item-active').data('id'));
		this.getOptionList();
		this.bind();
	},
	getOptionValueEleTpl: function() {
		return `<div data-id="" data-modify="true" data-order="" data-status="" data-name="" class="option-value-container option-value-add">
              <input type="text" class="option-name"/>
              <a href="javascript:void(0)" class="delete-btn">x</a>
            </div>`
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
		var $optionItem = $('.option-item');
		var hasError = false;

		$optionItem.find('.option-value-error').removeClass('option-value-error');

		$optionItem.each(function(_index, item) {
			let optionValueMap = new Map();
			let optionValueList = $(item).find('.option-value-container');

			optionValueList.each(function(index, value) {
				let optionName = $(value).find('.option-name').val();

				if(optionName === '') {
					hasError = true;

					$(value).addClass('option-value-error');
				} else if (optionValueMap.has(optionName)) {
					hasError = true;
					$(value).addClass('option-value-error');
					optionValueList.eq(optionValueMap.get(optionName)).addClass('option-value-error');
				} else {
					optionValueMap.set(optionName, index);
				}
			});
		});

		return hasError;
	},
	getOptionList: function() {
		var optionList = [];
		$('.option-item').each(function(index, item) {
			var $optionItem = $(item);
			var optionInfo = {
				optionId: $optionItem.data('id'),
				values: [],
				deleteList: $optionItem.data('delete')
			};

			$optionItem.find('.option-value-container').each(function(index, optionValue) {
				let $optionValue = $(optionValue);
				optionInfo.values.push({
					id: $optionValue.data('id'),
					name: $optionValue.find('.option-name').val()
				});
			});

			optionList.push(optionInfo);
		});

		return optionList;
	},
	bind: function() {
		var self = this;

		self.optionValueListContainer.on('click', '.option-value-add-btn', function(e) {
			$(this).parent('.option-value-list-container').append(self.getOptionValueEleTpl(), $(this))
		});
		self.optionValueListContainer.on('click', '.delete-btn', function(e) {
			var optionValueContainer = $(this).parents('.option-value-container');
			var optionItem = $(this).parents('.option-item');
			var optionId = optionValueContainer.data('id');
			var deleteListStr = optionItem.data('delete');
			var deleteList = new Set(deleteListStr == ''? [] : optionItem.data('delete').split(','));
			deleteList.add(optionId);

			optionItem.data('delete', Array.from(deleteList.values()).toString());
			optionValueContainer.remove();
		});

		self.questionSaveBtn.on('click', function(e) {
			self.updateQuestion();
		});
		self.optionSaveBtn.on('click', function(e) {
			self.updateOption();
		});
	}
};

index.init();