		//introStart
		var intro = introJs();
		intro.setOptions({
		    steps: [{
		            element: '#search',
		            intro: 'To start your query click on this button. Then the panel opens.',
		            position: 'top',

		        }, {
		            intro: 'With this panel you can decide for what kind of pub you would like to search.',
		        },

		        {
		            element: '.ui-grid-d',
		            intro: 'With these buttons you can decide which kind of pubs should be shown in the map',
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