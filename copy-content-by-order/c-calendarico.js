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
	var isEnded = ico.EndDate.getTime() < dinamicVars.Now.getTime();
	return isEnded;
};

var isStartedIco = function(ico) {
	var isStarted = ico.StartDate.getTime() < dinamicVars.Now.getTime();
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
		return !isEndedIco(ico) && isStartedIco(ico) && ico.PartnershipLevel == 5;
	});
	sortByEndDate(dinamicVars.Icos.Active.Platinum);
	dinamicVars.Icos.Active.Gold = icos.filter(function(ico) {
		return !isEndedIco(ico) && isStartedIco(ico) && ico.PartnershipLevel == 4;
	});
	sortByEndDate(dinamicVars.Icos.Active.Gold);
	dinamicVars.Icos.Active.Silver = icos.filter(function(ico) {
		return !isEndedIco(ico) && isStartedIco(ico) && ico.PartnershipLevel == 3;
	});
	sortByEndDate(dinamicVars.Icos.Active.Silver);
	dinamicVars.Icos.Active.Bronze = icos.filter(function(ico) {
		return !isEndedIco(ico) && isStartedIco(ico) && ico.PartnershipLevel == 2;
	});
	sortByEndDate(dinamicVars.Icos.Active.Bronze);
	dinamicVars.Icos.Active.Basic = icos.filter(function(ico) {
		return !isEndedIco(ico) && isStartedIco(ico) && ico.PartnershipLevel == 1;
	});
	sortByEndDate(dinamicVars.Icos.Active.Basic);
};

var getUpcomingIcos = function() {
	dinamicVars.Icos.Upcoming.Platinum = icos.filter(function(ico) {
		return !isEndedIco(ico) && !isStartedIco(ico) && ico.PartnershipLevel == 5;
	});
	sortByStartDate(dinamicVars.Icos.Upcoming.Platinum);
	dinamicVars.Icos.Upcoming.Gold = icos.filter(function(ico) {
		return !isEndedIco(ico) && !isStartedIco(ico) && ico.PartnershipLevel == 4;
	});
	sortByStartDate(dinamicVars.Icos.Upcoming.Gold);
	dinamicVars.Icos.Upcoming.Silver = icos.filter(function(ico) {
		return !isEndedIco(ico) && !isStartedIco(ico) && ico.PartnershipLevel == 3;
	});
	sortByStartDate(dinamicVars.Icos.Upcoming.Silver);
	dinamicVars.Icos.Upcoming.Bronze = icos.filter(function(ico) {
		return !isEndedIco(ico) && !isStartedIco(ico) && ico.PartnershipLevel == 2;
	});
	sortByStartDate(dinamicVars.Icos.Upcoming.Bronze);
	dinamicVars.Icos.Upcoming.Basic = icos.filter(function(ico) {
		return !isEndedIco(ico) && !isStartedIco(ico) && ico.PartnershipLevel == 1;
	});
	sortByStartDate(dinamicVars.Icos.Upcoming.Basic);
};

var getRecentIcos = function() {
	dinamicVars.Icos.Recent.Platinum = icos.filter(function(ico) {
		return isEndedIco(ico) && isStartedIco(ico) && ico.PartnershipLevel == 5;
	});
	sortByEndDate(dinamicVars.Icos.Recent.Platinum);
	dinamicVars.Icos.Recent.Gold = icos.filter(function(ico) {
		return isEndedIco(ico) && isStartedIco(ico) && ico.PartnershipLevel == 4;
	});
	sortByEndDate(dinamicVars.Icos.Recent.Gold);
	dinamicVars.Icos.Recent.Silver = icos.filter(function(ico) {
		return isEndedIco(ico) && isStartedIco(ico) && ico.PartnershipLevel == 3;
	});
	sortByEndDate(dinamicVars.Icos.Recent.Silver);
	dinamicVars.Icos.Recent.Bronze = icos.filter(function(ico) {
		return isEndedIco(ico) && isStartedIco(ico) && ico.PartnershipLevel == 2;
	});
	sortByEndDate(dinamicVars.Icos.Recent.Bronze);
	dinamicVars.Icos.Recent.Basic = icos.filter(function(ico) {
		return isEndedIco(ico) && isStartedIco(ico) && ico.PartnershipLevel == 1;
	});
	sortByEndDate(dinamicVars.Icos.Recent.Basic);
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

		ico.MillisecondsToStart = !isStartedIco(ico) && ico.StartDate.getTime() - dinamicVars.Now.getTime();
		ico.MillisecondsToClose =
			!isEndedIco(ico) && isStartedIco(ico) && ico.EndDate.getTime() - dinamicVars.Now.getTime();

		ico.MillisecondsDuration = ico.MillisecondsToClose - ico.MillisecondsToStart;
		ico.MillisecondsElapsed = dinamicVars.Now.getTime() - ico.MillisecondsToStart;

		ico.Progress = ico.MillisecondsElapsed * 100 / ico.MillisecondsDuration;

		ico.StartCountDownDays = parseInt(ico.MillisecondsToStart / (1000 * 60 * 60 * 24));
		ico.MillisecondsToStart -= (ico.StartCountDownDays * 1000 * 60 * 60 * 24);
		ico.StartCountDownHours = parseInt(ico.MillisecondsToStart / (1000 * 60 * 60));
		ico.MillisecondsToStart -= (ico.StartCountDownHours * 1000 * 60 * 60);
		ico.StartCountDownMinutes = parseInt(ico.MillisecondsToStart / (1000 * 60));
		ico.MillisecondsToStart -= (ico.StartCountDownMinutes * 1000 * 60);
		ico.StartCountDown = ico.StartCountDownDays + ':' + ico.StartCountDownHours + ':' + ico.StartCountDownMinutes;

		ico.CloseCountDownDays = parseInt(ico.MillisecondsToClose / (1000 * 60 * 60 * 24));
		ico.MillisecondsToClose -= (ico.CloseCountDownDays * 1000 * 60 * 60 * 24);
		ico.CloseCountDownHours = parseInt(ico.MillisecondsToClose / (1000 * 60 * 60));
		ico.MillisecondsToClose -= (ico.CloseCountDownHours * 1000 * 60 * 60);
		ico.CloseCountDownMinutes = parseInt(ico.MillisecondsToClose / (1000 * 60));
		ico.MillisecondsToClose -= (ico.CloseCountDownMinutes * 1000 * 60);
		ico.CloseCountDown = ico.CloseCountDownDays + ':' + ico.CloseCountDownHours + ':' + ico.CloseCountDownMinutes;

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
	console.log(icosRaw);
	console.log(icos);
	console.log(dinamicVars);
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
