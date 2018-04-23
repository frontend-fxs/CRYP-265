var dinamicVars = {};

var initDinamicVars = function() {
	dinamicVars.Translations = translations;
};

$('#target').load('copy-content-by-order/d-mustache.html #template1', function() {
	initDinamicVars();
	var template = document.getElementById('template1').innerHTML;
	var output = Mustache.render(template, dinamicVars);
	$('#icoCalendar').html(output);
});
