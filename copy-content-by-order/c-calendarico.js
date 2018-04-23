	var dinamicVars = {};
	var htmlTemplateFile = 'copy-content-by-order/d-mustache.html';
	var initDinamicVars = function() {
		dinamicVars.Translations = translations;
	};

	var htmlRender = function() {
		initDinamicVars();
		if (FXStreet) {
			FXStreet.Util.loadHtmlTemplate(htmlTemplateFile).done(function(template) {
				var rendered = FXStreet.Util.renderByHtmlTemplate(template, dinamicVars);
				$('#icoCalendar').append(rendered);
			});
		}else{
			setTimeout(() => {
				htmlRender();
			}, 1000);
		}
	};

	htmlRender();