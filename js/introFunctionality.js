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
		            intro: 'With this button and the two more left you can decide which kind of pubs should be shown in the map',
		            position: 'top',

		        }, {
		            element: '.leaflet-control-geosearch',
		            intro: 'Here you can serach for streets and pubs and more OSM Elements',
		            position: 'bottom',

		        }, {
		            element: '.leaflet-control-locate',
		            intro: 'With this button you can find your actual location.',
		            position: 'bottom',

		        }, {
		            element: '.leaflet-control-zoom',
		            intro: 'With this button you can zoom in and out of the map.',
		            position: 'right',

		        }, {
		            element: '.leaflet-control-layers',
		            intro: 'Here you can choose different maps.',
		            position: 'left',

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