var dinamicVars = {};

var initDinamicVars = function() {
	dinamicVars.Translations = translations;
};
$(document).ready(function() {
	initDinamicVars();
	$.get('copy-content-by-order/d-mustache.html', function(template) {
		var rendered = Mustache.render(template, dinamicVars);
		$('#target').html(rendered);
	});
	var template = $('#icoCalendarTemplate').html();
	var output = Mustache.render(template, dinamicVars);
	$('#icoCalendar').html(output);
});
