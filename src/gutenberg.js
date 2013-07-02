var Gutenberg = (function () {
	"use strict";

	var Module = {

		init: function (options) {
			var _this = this;
			_this.options = options || {};
			_this.ajax = options.ajaxMock || $.ajax;

			_this.determineTemplateType = helper.determineTemplateType.bind(this);
			_this.initTemplate = helper.initTemplate.bind(this);
			_this.buildFinalHtml = view.build.init.bind(this);

			_this.determineTemplateType(function (type) {
				_this.options.type = type;
				_this.initTemplate(function () {
					return _this.buildFinalHtml();
				});
			});
		}

		// BEGIN TESTING API
		model: model,
		helper: helper,
		view: view
		// END TESTING API
	},
	view = {},
	model = {},
	helper = {};
 
	return Module;

	helper.determineTemplateType = function (callback) {
		var type;
		if (typeof _this.options.template === 'object') {
			type = 'object';
		} else if (_this.options.template.indexOf('{{')){
			type = 'inlinetemplate';
		} else if (_this.options.template.indexOf('http') || _this.options.template.indexOf('/')) {
			type = 'url';
		}
		callback && callback(type);
	};

	helper.initTemplate = function (callback) {
		if (_this.options.type === 'object') {
			_this.template = $(_this.options.template).html();
			callback && callback();
		} else if (_this.options.type === 'inlinetemplate') {
			_this.template = _this.options.template;
			callback && callback();
		} else if (_this.options.type === 'url') {
			model.get.call(this, function (error) {
				if (error) {
					console.error(error);
				} else {
					callback && callback();
				}
			});
		}
	};

	model.get = function (callback) {
		var _this = this;
		_this.ajax({
			type: "GET",
			url: _this.options.template,
			success: function(resp) {
				_this.template = resp;
				callback && callback();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				callback && callback(errorThrown);
			}
		});
	};

	view.build = {};

	view.build.init = function () {
		var _this = this,
			templateMarkup;
		Object.keys(_this.options.data).forEach(function (key) {
			templateMarkup = view.build.replaceInString(key, _this.options.data[key], templateMarkup);
		});
		return templateMarkup;
	};

	view.build.replaceInString = function (key, val, str) {
		return str.replace('{{' + key.trim() + '}}', val);
	};

}());