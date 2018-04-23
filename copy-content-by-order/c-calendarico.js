var dinamicVars = {};
var htmlTemplateFile = 'copy-content-by-order/d-mustache.html';
var initDinamicVars = function() {
	dinamicVars.Translations = translations;
};

var htmlRender = function() {
	initDinamicVars();
	FXStreet.Util.loadHtmlTemplate(htmlTemplateFile).done(function(template) {
		var rendered = FXStreet.Util.renderByHtmlTemplate(template, dinamicVars);
		$('#icoCalendar').append(rendered);
	});
};

htmlRender();
