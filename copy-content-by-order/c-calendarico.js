var htmlTemplateFile = 'copy-content-by-order/d-mustache.html';
var icos = [];

var randomIcosRaw = function() {
	for (var i = 0; i < 1000; i++) {
		icosRaw.push({
			PartnershipLevel: Math.floor(Math.random() * 5) + 1,
			Name: 'Votem',
			Description:
				'Voting for a mobile world Voting for a mobile world Voting for a mobile world Voting for a mobile world Voting for a mobile world Voting for a mobile world Voting for a mobile world',
			StartDate: {
				Year: Math.floor(Math.random() * 3) + 2017,
				Month: Math.floor(Math.random() * 12) + 1,
				Day: Math.floor(Math.random() * 28) + 1,
			},
			EndDate: {
				Year: Math.floor(Math.random() * 3) + 2017,
				Month: Math.floor(Math.random() * 12) + 1,
				Day: Math.floor(Math.random() * 28) + 1,
			},
			ImageUrl: 'https://tokenmarket.net/blockchain-static/ethereum/assets/votem/logo_small.png',
			ICOWeb: 'https://www.votem.io/',
			ICOReport: 'https://votem.com/our-story/',
			FXPage: 'https://www.fxstreet.com/',
		});
	}

	return icosRaw;
};

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

var createPartnershipIcons = function(ico) {
	ico.PartnershipIcons = [];
	for (let index = 1; index < ico.PartnershipLevel; index++) {
		ico.PartnershipIcons.push(index);
	}
	return ico;
};

var initTimeVars = function(ico) {
	ico.StartDate = new Date(ico.StartDate.Year, ico.StartDate.Month - 1, ico.StartDate.Day);
	ico.MillisecondsToStart = ico.StartDate.getTime() - dinamicVars.Now.getTime();
	ico.EndDate = new Date(ico.EndDate.Year, ico.EndDate.Month - 1, ico.EndDate.Day);
	ico.MillisecondsToClose =
		!isEndedIco(ico) && isStartedIco(ico) && ico.EndDate.getTime() - dinamicVars.Now.getTime();
	ico.MillisecondsDuration = ico.MillisecondsToClose - ico.MillisecondsToStart;
	ico.MillisecondsElapsed = ico.MillisecondsToStart * -1;
	if ((ico.EndDate.getTime() - dinamicVars.Now.getTime()) < (3*24*60*60*1000)) {
		ico.Imminent = true;
	}
	return ico;
};

var calculateProgress = function(ico) {
	ico.Progress = parseInt((ico.MillisecondsElapsed * 100) / ico.MillisecondsDuration);
	return ico;
};

var calculateStartCountDown = function(ico) {
	ico.StartCountDownDays = parseInt(ico.MillisecondsToStart / (1000 * 60 * 60 * 24));
	ico.MillisecondsToStart -= ico.StartCountDownDays * 1000 * 60 * 60 * 24;
	ico.StartCountDownHours = parseInt(ico.MillisecondsToStart / (1000 * 60 * 60));
	ico.MillisecondsToStart -= ico.StartCountDownHours * 1000 * 60 * 60;
	ico.StartCountDownMinutes = parseInt(ico.MillisecondsToStart / (1000 * 60));
	ico.MillisecondsToStart -= ico.StartCountDownMinutes * 1000 * 60;
	ico.StartCountDown = ico.StartCountDownDays + 'D ' + ico.StartCountDownHours + 'h ' + ico.StartCountDownMinutes + 'm';
	return ico;
};

var calculateCloseCountDown = function(ico) {
	ico.CloseCountDownDays = parseInt(ico.MillisecondsToClose / (1000 * 60 * 60 * 24));
	ico.MillisecondsToClose -= ico.CloseCountDownDays * 1000 * 60 * 60 * 24;
	ico.CloseCountDownHours = parseInt(ico.MillisecondsToClose / (1000 * 60 * 60));
	ico.MillisecondsToClose -= ico.CloseCountDownHours * 1000 * 60 * 60;
	ico.CloseCountDownMinutes = parseInt(ico.MillisecondsToClose / (1000 * 60));
	ico.MillisecondsToClose -= ico.CloseCountDownMinutes * 1000 * 60;
	ico.CloseCountDown = ico.CloseCountDownDays + 'D ' + ico.CloseCountDownHours + 'h ' + ico.CloseCountDownMinutes+'m';
	return ico;
};

var formatStartDateToLocale = function(ico) {
	ico.StartDateLocale = ico.StartDate.toLocaleDateString('en-EN', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	});
	return ico;
};

var formatEndDateToLocale = function(ico) {
	ico.EndDateLocale = ico.EndDate.toLocaleDateString('en-EN', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	});
	return ico;
};

var updateIcosRaw = function() {
	icos = icosRaw.map(function(ico) {
		createPartnershipIcons(ico);
		initTimeVars(ico);
		calculateProgress(ico);
		calculateStartCountDown(ico);
		calculateCloseCountDown(ico);
		formatStartDateToLocale(ico);
		formatEndDateToLocale(ico);
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
	randomIcosRaw();
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
