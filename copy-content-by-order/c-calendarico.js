var dinamicVars = {};
var htmlTemplateFile = 'copy-content-by-order/d-mustache.html';
var initDinamicVars = function() {
	dinamicVars.Translations = translations;
};

var htmlRender = function() {
	initDinamicVars();
	
	
	$('#target').load('copy-content-by-order/d-mustache.html', function() {
		var template = document.getElementById('icoCalendarTemplate').innerHTML;
		var output = Mustache.render(template, dinamicVars);
		$('#icoCalendar').html(output);
	});
};

htmlRender();
