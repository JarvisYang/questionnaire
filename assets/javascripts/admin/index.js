/**
 * Created by jarvis on 16/1/30.
 */

require('../commons/commons');

require('../../stylesheets/admin/index.less');

var index = {
	init: function() {
		this.optionValueListContainer = $('.option-value-list-container');
		this.bind();
	},
	getOptionValueEleTpl: function() {
		return `<div data-id="" data-modify="true" data-order="" data-status="" data-name="" class="option-value-container option-value-add">
              <input type="text" class="option-name"/>
              <a href="javascript:void(0)" class="delete-btn">x</a>
            </div>`
	},
	bind: function() {
		var self = this;

		self.optionValueListContainer.on('click', '.option-value-add-btn', function(e) {
			$(this).parent('.option-value-list-container').append(self.getOptionValueEleTpl(), $(this))
		});
		self.optionValueListContainer.on('click', '.delete-btn', function(e) {
			$(this).parents('.option-value-container').remove();
		});
	}
};

index.init();