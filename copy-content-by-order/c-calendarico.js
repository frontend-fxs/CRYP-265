var dinamicVars = {};

$(document).load('copy-content-by-order/d-mustache.html #template1', function() {
	var template = document.getElementById('template1').innerHTML;
	var output = Mustache.render(template, dinamicVars);
	$('#icoCalendar').html(output);
});
