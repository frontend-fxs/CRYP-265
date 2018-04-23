var dinamicVars = {};
var htmlTemplateFile = 'copy-content-by-order/d-mustache.html';
var initDinamicVars = function() {
	dinamicVars.Translations = translations;
};

	var htmlRender = function(jsonData) {
		FXStreet.Util.loadHtmlTemplate(htmlTemplateFile).done(function(template) {
			var rendered = FXStreet.Util.renderByHtmlTemplate(template, jsonData);
			$('#icoCalendar').append(rendered);
		});
	};


$(document).ready(function() {
	initDinamicVars();
	htmlRender(dinamicVars);
});



		
