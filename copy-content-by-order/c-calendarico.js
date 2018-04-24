var dinamicVars = {};
var htmlTemplateFile = 'copy-content-by-order/d-mustache.html';

var IsEndedIco = function(ico) {
	var IsEnded = ico.endDate.getTime() < dinamicVars.Now.getTime();
	return IsEnded;
};

var IsStartedIco = function(ico) {
	var isStarted = ico.startDate.getTime() < dinamicVars.Now.getTime();
	return IsStarted;
};

var getActiveIcos = function() {
	dinamicVars.Icos.Active = icos.filter(ico => !IsEndedIco(ico) && IsStartedIco(ico));
};

var getUpcomingIcos = function() {
	dinamicVars.Icos.Upcoming = icos.filter(ico => !IsEndedIco(ico) && !IsStartedIco(ico));
};

var getRecentIcos = function() {
	dinamicVars.Icos.Upcoming = icos.filter(ico => IsEndedIco(ico) && IsStartedIco(ico));
};

var filterIcosByDate = function() {
	getActiveIcos();
	getUpcomingIcos();
	getRecentIcos();
};

var updateDinamicVars = function() {
	dinamicVars.Now = new Date();
	filterIcosByDate();
};

var initDinamicVars = function() {
	dinamicVars.Translations = translations;
	updateDinamicVars();
};

var htmlRender = function() {
	initDinamicVars();
	$('#target').load(htmlTemplateFile, function() {
		var template = document.getElementById('icoCalendarTemplate').innerHTML;
		var output = Mustache.render(template, dinamicVars);
		$('#icoCalendar').html(output);
	});
};

htmlRender();

setInterval(function() {
	htmlRender();
}, 60000);