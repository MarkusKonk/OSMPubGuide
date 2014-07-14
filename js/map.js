		var lon = 7.6286;
		var lat = 51.9629;
		var zoom = 14;
		var zoomPosition = 'topleft';
		var searchPosition = 'topcenter';
		var b_box = false;

		 // map definition
		var map = L.map('map', {
		    zoomControl: false,
		    center: [lat, lon],
		    zoom: zoom
		})
		
		var day = L.tileLayer('http://openpubguide-tile.uni-muenster.de:8001/tiles/{z}/{x}/{y}.png', {
		maxZoom: 22,
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		
		
		var night = new L.tileLayer('http://openpubguide-tile.uni-muenster.de:8002/tiles/{z}/{x}/{y}.png', {
		maxZoom: 22,
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		});

		 //Leaflet.Geosearch: Search Bar (Provider: OpenStreetMap)
		new L.Control.GeoSearch({
		    provider: new L.GeoSearch.Provider.OpenStreetMap(),
		    position: searchPosition,
		    showMarker: false
		}).addTo(map);

		map.addControl(L.control.zoom({
		    position: zoomPosition
		}));

		 //Leaflet.Locator: Current Location  
		L.control.locate({
		    position: 'topleft', // set the location of the control
		    drawCircle: true, // controls whether a circle is drawn that shows the uncertainty about the location
		    follow: false, // follow the user's location
		    setView: true, // automatically sets the map view to the user's location, enabled if `follow` is true
		    keepCurrentZoomLevel: false, // keep the current map zoom level when displaying the user's location. (if `false`, use maxZoom)
		    stopFollowingOnDrag: false, // stop following when the map is dragged if `follow` is true (deprecated, see below)
		    remainActive: false, // if true locate control remains active on click even if the user's location is in view.
		    markerClass: L.circleMarker, // L.circleMarker or L.marker
		    circleStyle: {}, // change the style of the circle around the user's location
		    markerStyle: {},
		    followCircleStyle: {}, // set difference for the style of the circle around the user's location while following
		    followMarkerStyle: {},
		    icon: 'icon-location', // `icon-location` or `icon-direction`
		    iconLoading: 'icon-spinner  animate-spin', // class for loading icon
		    circlePadding: [0, 0], // padding around accuracy circle, value is passed to setBounds
		    metric: true, // use metric or imperial units
		    onLocationError: function (err) {
		        alert(err.message)
		    }, // define an error callback function
		    onLocationOutsideMapBounds: function (context) { // called when outside map boundaries
		        alert(context.options.strings.outsideMapBoundsMsg);
		    },
		    strings: {
		        title: "Show me where I am", // title of the locate control
		        popup: "You are within {distance} {unit} from this point", // text to appear if user clicks on circle
		        outsideMapBoundsMsg: "You seem located outside the boundaries of the map" // default message for onLocationOutsideMapBounds
		    },
		    locateOptions: {} // define location options e.g enableHighAccuracy: true or maxZoom: 10
		}).addTo(map);

		//layerSwitcher
		function layerSwitcher() {
		if (map.hasLayer(day)) {
		map.removeLayer(day);
		night.addTo(map);
		document.getElementById('layerswitcher').innerHTML = 'Day view';
		}
		else {
		map.removeLayer(night);
		day.addTo(map);
		document.getElementById('layerswitcher').innerHTML = 'Night view';
		}
		}


		// add Layers Control to mmap
		$(document).ready(function () {
			$("#datePickerStart").val(getnow());
			var start = $("#datePickerStart").val();
			query = "http://giv-openpubguide.uni-muenster.de:8080/OSMPubGuide-WS/tosm/query?bbox=51.95,7.6,51.967,7.644" +"&start=" + start +":00";
			console.log(query);
			ajaxrequest(query)
			// set current date and time as default value in the datepicker
		});


