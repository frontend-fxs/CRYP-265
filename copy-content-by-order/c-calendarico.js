var htmlTemplateFile = 'copy-content-by-order/d-mustache.html';
var icos = [];
var dinamicVars = {
	Icos: {
		Active: { Platinum: [], Gold: [], Silver: [], Bronze: [], Basic: [] },
		Upcoming: { Platinum: [], Gold: [], Silver: [], Bronze: [], Basic: [] },
		Recent: { Platinum: [], Gold: [], Silver: [], Bronze: [], Basic: [] },
	},
	Translations: {},
};

var isEndedIco = function(ico) {
	var isEnded = ico.endDate.getTime() < dinamicVars.Now.getTime();
	return isEnded;
};

var isStartedIco = function(ico) {
	var isStarted = ico.startDate.getTime() < dinamicVars.Now.getTime();
	return isStarted;
};

var sortByEndDate = function(icos) {
	icos.sort(function(a, b) {
		return a.EndDate.getTime() - b.EndDate.getTime();
	});
};

var sortByStartDate = function(icos) {
	icos.sort(function(a, b) {
		return a.StartDate.getTime() - b.StartDate.getTime();
	});
};


var getActiveIcos = function() {
	dinamicVars.Icos.Active.Platinum = icos.filter(function(ico) {
		return !isEndedIco(ico) && isStartedIco(ico) && ico.partnershipLevel == 5;
	});
	sortByEndDate(dinamicVars.Icos.Active.Platinum);
	dinamicVars.Icos.Active.Gold = icos.filter(function(ico) {
		return !isEndedIco(ico) && isStartedIco(ico) && ico.partnershipLevel == 4;
	});
	sortByEndDate(dinamicVars.Icos.Active.Gold);
	dinamicVars.Icos.Active.Silver = icos.filter(function(ico) {
		return !isEndedIco(ico) && isStartedIco(ico) && ico.partnershipLevel == 3;
	});
	sortByEndDate(dinamicVars.Icos.Active.Silver);
	dinamicVars.Icos.Active.Bronze = icos.filter(function(ico) {
		return !isEndedIco(ico) && isStartedIco(ico) && ico.partnershipLevel == 2;
	});
	sortByEndDate(dinamicVars.Icos.Active.Bronze);
	dinamicVars.Icos.Active.Basic = icos.filter(function(ico) {
		return !isEndedIco(ico) && isStartedIco(ico) && ico.partnershipLevel == 1;
	});
	sortByEndDate(dinamicVars.Icos.Active.Basic);
};


var getUpcomingIcos = function() {
	dinamicVars.Icos.Upcoming.Platinum = icos.filter(function(ico) {
		return !isEndedIco(ico) && !isStartedIco(ico) && ico.partnershipLevel == 5;
	});
	dinamicVars.Icos.Upcoming.Gold = icos.filter(function(ico) {
		return !isEndedIco(ico) && !isStartedIco(ico) && ico.partnershipLevel == 4;
	});
	dinamicVars.Icos.Upcoming.Silver = icos.filter(function(ico) {
		return !isEndedIco(ico) && !isStartedIco(ico) && ico.partnershipLevel == 3;
	});
	dinamicVars.Icos.Upcoming.Bronze = icos.filter(function(ico) {
		return !isEndedIco(ico) && !isStartedIco(ico) && ico.partnershipLevel == 2;
	});
	dinamicVars.Icos.Upcoming.Basic = icos.filter(function(ico) {
		return !isEndedIco(ico) && !isStartedIco(ico) && ico.partnershipLevel == 1;
	});
};

var getRecentIcos = function() {
	dinamicVars.Icos.Recent.Platinum = icos.filter(function(ico) {
		return isEndedIco(ico) && isStartedIco(ico) && ico.partnershipLevel == 5;
	});
	dinamicVars.Icos.Recent.Gold = icos.filter(function(ico) {
		return isEndedIco(ico) && isStartedIco(ico) && ico.partnershipLevel == 4;
	});
	dinamicVars.Icos.Recent.Silver = icos.filter(function(ico) {
		return isEndedIco(ico) && isStartedIco(ico) && ico.partnershipLevel == 3;
	});
	dinamicVars.Icos.Recent.Bronze = icos.filter(function(ico) {
		return isEndedIco(ico) && isStartedIco(ico) && ico.partnershipLevel == 2;
	});
	dinamicVars.Icos.Recent.Basic = icos.filter(function(ico) {
		return isEndedIco(ico) && isStartedIco(ico) && ico.partnershipLevel == 1;
	});
};

var filterIcosByDate = function() {
	getActiveIcos();
	getUpcomingIcos();
	getRecentIcos();
};

var updateIcosRaw = function() {
	icos = icosRaw.map(function(ico) {
		ico.PartnershipIcons = [];
		for (let index = 1; index < ico.PartnershipLevel; index++) {
			ico.PartnershipIcons.push(index);
		}

		ico.MillisecondsToStart = !isStartedIco(ico) && ico.endDate.getTime() - dinamicVars.Now.getTime();

		ico.StartCountDownDays = parseInt(ico.MillisecondsToStart / 1000 * 60 * 60 * 24);
		ico.MillisecondsToStart -= ico.StartCountDownDays * 1000 * 60 * 60 * 24;
		ico.StartCountDownHours = parseInt(ico.MillisecondsToStart / 1000 * 60 * 60);
		ico.MillisecondsToStart -= ico.StartCountDownHours * 1000 * 60 * 60;
		ico.StartCountDownMinutes = parseInt(ico.MillisecondsToStart / 1000 * 60);
		ico.MillisecondsToStart -= ico.StartCountDownMinutes * 1000 * 60;
		ico.StartCountDown = ico.StartCountDownDays + ':' + ico.ReleaseCountDownHours + ':' + ico.ReleaseCountDownMinutes;

		ico.MillisecondsToClose = !isEndedIco(ico) && isStartedIco(ico) && ico.endDate.getTime() - dinamicVars.Now.getTime();

		ico.CloseCountDownDays = parseInt(ico.MillisecondsToClose / 1000 * 60 * 60 * 24);
		ico.MillisecondsToClose -= ico.CloseCountDownDays * 1000 * 60 * 60 * 24;
		ico.CloseCountDownHours = parseInt(ico.MillisecondsToClose / 1000 * 60 * 60);
		ico.MillisecondsToClose -= ico.CloseCountDownHours * 1000 * 60 * 60;
		ico.CloseCountDownMinutes = parseInt(ico.MillisecondsToClose / 1000 * 60);
		ico.MillisecondsToClose -= ico.CloseCountDownMinutes * 1000 * 60;
		ico.CloseCountDown = ico.CloseCountDownDays + ':' + ico.CloseCountDownHours + ':' + ico.CloseCountDownMinutes;

		ico.MillisecondsDuration = ico.MillisecondsToClose - ico.MillisecondsToStart; 
		ico.MillisecondsElapsed = dinamicVars.Now.getTime() - ico.MillisecondsToStart;

		ico.progressToEnd = ico.MillisecondsElapsed * 100 / ico.MillisecondsDuration;

		ico.progressToStart = ico.MillisecondsElapsed * 100 / ico.MillisecondsDuration;


		ico.StartDateLocale = ico.StartDate.toLocaleDateString('en-EN', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		});
		ico.EndDateLocale = ico.EndDate.toLocaleDateString('en-EN', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		});

		return ico;
	});
};

var updateDinamicVars = function() {
	updateIcosRaw();
	filterIcosByDate();
};

var initDinamicVars = function() {
	dinamicVars.Translations = translations;
	dinamicVars.Now = new Date();
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
