var dinamicVars = {};
var htmlTemplateFile = 'copy-content-by-order/d-mustache.html';
var initDinamicVars = function() {
	dinamicVars.Translations = translations;
};

var htmlRender = function() {
	initDinamicVars();
	
	
	$('#target').load('d-mustache.html #icoCalendarTemplate', function() {
		var template = document.getElementById('icoCalendarTemplate').innerHTML;
		var output = Mustache.render(template, dinamicVars);
		$('#icoCalendar').html(output);
	});
};

htmlRender();
