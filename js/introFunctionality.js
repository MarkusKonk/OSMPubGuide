		//introStart
		var intro = introJs();
		intro.setOptions({
		    steps: [{
		            element: '#search',
		            intro: 'To start your query click on this button. Then the panel opens.',
		            position: 'top',

		        }, {
		            intro: 'Within this panel the results of a query are shown. In addition to this you can click on "Enter your Query" to start a new one.',
		        },

		        {
		            element: '.ui-grid-d',
		            intro: 'By clicking on one of these buttons a query will be executed. The possibilities are: query for opened pubs with cheapest beer price, query for all opened pubs and query for opened pubs which offer warm food.',
		            position: 'top',

		        }, 
				{
		            element: '.leaflet-control-locate',
		            intro: 'With this button you can find your actual location.',
		            position: 'bottom',

		        }, 

		    ],
		    "showStepNumbers": "no",

		});
		intro.onchange(function (targetElement) {

		    if (targetElement.className == "introjsFloatingElement") {
		        $('#leftpanel2').panel('open');
		        $(".introjs-overlay").css("opacity", "0");
		    } 
			else {
		        $('#leftpanel2').panel('close');
		        $(".introjs-overlay").css("opacity", "1");
		    }
		});

		intro.onbeforechange(function (targetElement) {
		    if (targetElement.className == "ui-grid-d") {
		        intro.setOption('tooltipClass', 'custom');
		    } 
			else {
		        intro.setOption('tooltipClass', '');
		    }
		});
		//IntroEnd