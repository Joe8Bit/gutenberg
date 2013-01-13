var Gutenberg = function (dataObj, templateMarkup) {
	'use strict';
	var replaceInString = function (key, val, str) {
			return str.replace('{{' + key.trim() + '}}', val);
		};
	Object.keys(dataObj).forEach(function (key) {
		templateMarkup = replaceInString(key, dataObj[key], templateMarkup);
	});
	return templateMarkup;
};