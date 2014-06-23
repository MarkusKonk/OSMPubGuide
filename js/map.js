		var lon = 7.6286;
		var lat = 51.9629;
		var zoom = 14;
		var zoomPosition = 'topright';
		var searchPosition = 'topcenter';


		// different OSM layers
		var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		    }),
		    mapquest = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', { 
				attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.mapquest.com/\">MapQuest</a>', subdomains: '1234'
			}),
		    humanitarian = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { 
				attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> | Tiles &copy; <a href=\"http://hot.openstreetmap.org\">Humanitarian OSM Team</a>'
			});

		// map definition
		var map = L.map('map', {
		    zoomControl: false,
		    center: [lat, lon],
		    zoom: zoom,
		    layers: [osm]
		})

		 map.addControl(L.control.zoom({
		    position: zoomPosition
		}));



		var baseLayers = {
		    "OpenStreetMap Mapnik": osm,
		    "OpenStreetMap MapQuest": mapquest,
			"OpenStreetMap Humanitarian": humanitarian
		};

		 //Baselayer switcher
		L.control.layers(baseLayers).addTo(map)
		
				var guitar = L.icon({
		    iconUrl: 'css/images/concert2.png',

		    iconSize: [32, 32], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});
        var guitarIcon = L.icon({
		    iconUrl: 'css/images/concert2.png',

		    iconSize: [32, 32], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});
		var partyIcon = L.icon({
		    iconUrl: 'css/images/disco2.png',
		    iconSize: [32, 32], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});

		var beerIcon = L.icon({
		    iconUrl: 'css/images/beer2.png',
		    iconSize: [32, 32], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});
        //Popup
         //marker types
		 var layerGuitar=L.layerGroup();
		 var layerParty=L.layerGroup();
		 var layerBeer=L.layerGroup();
		 
		 //
		 function addLayerofMarkers(){
		 layerGuitar.addTo(map);
		 layerParty.addTo(map);
		 layerBeer.addTo(map);
		 }
		 
		 function deleteAllMarkerandPopups(){
		 $( "[id^=popup_]" ).remove();
			map.removeLayer(layerGuitar);
			map.removeLayer(layerParty);
			map.removeLayer(layerBeer);
		    layerGuitar=L.layerGroup();
		    layerParty=L.layerGroup();
		    layerBeer=L.layerGroup();
			}
		 function addMarker(marker,type){
		   var iconSize=null;
		   if(type=="guitar"){
		      marker.setIcon(guitarIcon);
			  marker.addTo(layerGuitar);
			  iconSize=guitarIcon.options.iconSize;
			  }
		   else{
		      if(type=="party"){
		          marker.setIcon(partyIcon);
				  marker.addTo(layerParty);
				  iconSize=partyIcon.options.iconSize;
			 	}
		      else{
		         if(type=="beer"){
		             marker.setIcon(beerIcon);
					 marker.addTo(layerBeer);
					 iconSize=guitarIcon.options.iconSize;
			    	}
		        }
			}
			return iconSize;
		 }
		 function addPopup(lat, lng, pubName, id,type, opening_hours, adress, e_mail, phone, website, images) {
		        var marker=L.marker();
		        marker.setLatLng([lat, lng]);
		        //adress
		        var adresses = adress.split(',');
		        var adress = "";
		        for (var p in adresses) {
		            adress = adress + adresses[p] + "<br>";
		        }
		        //opening hours
		        var opening = opening_hours.split(',');
		        var openingHours = "<table>";
		        for (var i = 0; i < opening.length; i++) {
		            var openArray = opening[i].split(":");
		            openingHours = openingHours + "<tr><td>" + openArray[0] + ":</td>";
		            openingHours = openingHours + "<td>" + openArray[1] + "</td></tr>";
		        }
		        openingHours = openingHours + " </table>";
		        //images
		        var pictures = images.split(',');
		        var images = "";
		        for (var i = 0; i < pictures.length; i++) {
		            images = images + "<img src=" + pictures[i] + " style = 'height:80px;'/>";
		        }
		        //create popup element
				
		        var popup="<div data-role='popup' id='popup_" + id + "' class='ui-content ' data-arrow='true'><a data-rel='back' data-role='button' data-theme='a' data-icon='delete' data-iconpos='notext' class='ui-btn-right'/><p align='center'><a>" + pubName + "</a></p><table style='border-spacing: 15px 0px'><tr><td valign='top'><b>Opening hours </b> </td><td>" + openingHours + "</td></tr><tr><td valign='top'><b>Adress</b></td><td>" + adress + " </td></tr><tr><td valign='top'><b>Phone number</b></td><td>" + phone + "</td></tr><tr><td valign='top'><b>Mail adress</b></td><td>" + e_mail + "</td></tr><tr valign='top'><td><b>Website</b></td><td><a href='" + website + "' style='font-weight:normal'>" + website + "</a>  </td></tr><tr><th  colspan='2' align='left'><a href='http://www.gorilla-bar.de/'>More information</a></th></tr></table><p align='center'>" + images + "</p></div>";
		        if($.mobile.activePage==null){
				$("#mapElements").append(popup);
				}
				else{
			    $.mobile.activePage.append(popup);
				$.mobile.activePage.trigger("create");
				}
				//$.mobile.activePage.append( popup ).trigger( "pagecreate" );
				 //add marker an return icon width and height
				 var iconSize=addMarker(marker,type);
				 var iconPopupWidth=parseInt(iconSize[0]/2);
				 var iconPopupHeight=parseInt(iconSize[1]/2);
				// bind popup to marker
		        marker.on('click', function (e) {
		            var m = e.target;
		            var x = map.latLngToContainerPoint(m.getLatLng(), zoom).x;
		            var y = map.latLngToContainerPoint(m.getLatLng(), zoom).y;
		            $("#popup_" + id + "").popup('open', {
		                x: x+iconPopupWidth,
		                y: y+iconPopupHeight
		            });
		        });
		       
		    }
		
			
		    //add dynamically popup
		addPopup(51.9629, 7.6286, 'Gorilla Bar', "GorillaBar","beer", "Mon - Thu: 20.00 - 02.00,Fri - Sat: 20.00 - 03.00", 'Juedefelderstr. 54,48143 MUENSTER', 'info@gorilla-bar.de', '0251-4882188', 'http://www.gorilla-bar.de/', "gorilla1.jpg,gorilla2.jpg");
		addPopup(51.961, 7.65, 'Cavete', "Cavete","party", "Mon - Thu: 20.00 - 02.00,Fri - Sat: 20.00 - 03.00", 'Juedefelderstr. 54,48143 MUENSTER', 'info@gorilla-bar.de', '0251-4882188', 'http://www.gorilla-bar.de/', "gorilla1.jpg,gorilla2.jpg");
        //addLayerofMarkers();
		 //Popup end
		var popup = L.popup();

		function onMapClick(e) {
		    popup
		        .setLatLng(e.latlng)
		        .setContent("You clicked the map at " + e.latlng.toString())
		        .openOn(map);
		}

		map.on('click', onMapClick);

		 //Leaflet.Geosearch: Search Bar (Provider: OpenStreetMap)
		new L.Control.GeoSearch({
		    provider: new L.GeoSearch.Provider.OpenStreetMap(),
		    position: searchPosition,
		    showMarker: false
		}).addTo(map);

		//Leaflet.Locator: Current Location  
		L.control.locate({
		position: 'topleft',  // set the location of the control
		follow: true,  // follow the user's location
		}).addTo(map);

		var guitar = L.icon({
		    iconUrl: 'css/images/concert2.png',

		    iconSize: [32, 32], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});

		var partyIcon = L.icon({
		    iconUrl: 'css/images/disco2.png',
		    iconSize: [32, 32], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});

		var beerIcon = L.icon({
		    iconUrl: 'css/images/beer2.png',
		    iconSize: [32, 32], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});

		var concert1 = L.marker([51.96712, 7.60331], {
		        icon: guitar
		    }).bindPopup(''),
		    concert2 = L.marker([51.96801, 7.64451], {
		        icon: guitar
		    }).bindPopup(''),
		    concert3 = L.marker([51.95437, 7.62983], {
		        icon: guitar
		    }).bindPopup(''),
		    concert4 = L.marker([51.97626, 7.62451], {
		        icon: guitar
		    }).bindPopup('');
		var party1 = L.marker([51.97552, 7.58769], {
		        icon: partyIcon
		    }).bindPopup(''),
		    party2 = L.marker([51.97325, 7.58666], {
		        icon: partyIcon
		    }).bindPopup(''),
		    party3 = L.marker([51.96188, 7.62546], {
		        icon: partyIcon
		    }).bindPopup(''),
		    paryt4 = L.marker([51.95913, 7.62185], {
		        icon: partyIcon
		    }).bindPopup('');
		var beer1 = L.marker([51.97769, 7.64142], {
		        icon: beerIcon
		    }).bindPopup(''),
		    beer2 = L.marker([51.96569, 7.66125], {
		        icon: beerIcon
		    }).bindPopup(''),
		    beer3 = L.marker([51.95876, 7.63653], {
		        icon: beerIcon
		    }).bindPopup(''),
		    beer4 = L.marker([51.96251, 7.61335], {
		        icon: beerIcon
		    }).bindPopup('');

		var concerts = L.layerGroup([concert1, concert2, concert3, concert4]);
		partys = L.layerGroup([party1, party2, party3, paryt4]);
		beers = L.layerGroup([beer1, beer2, beer3, beer4]);

		var overlayMaps = {
		    "Concerts": concerts,
		    "Partys": partys,
		    "Beers": beers
		};

		$("#concert").click(function () {
		    if (map.hasLayer(concerts)) {
		        map.removeLayer(concerts);
		    } else {
		        concerts.addTo(map);
		    }
			 if (map.hasLayer(layerGuitar)) {
		        map.removeLayer(layerGuitar);
		    } else {
		        layerGuitar.addTo(map);
		    }
		});

		$("#party").click(function () {
		    if (map.hasLayer(partys)) {
		        map.removeLayer(partys);
		    } else {
		        partys.addTo(map);
		    }
			 if (map.hasLayer(layerParty)) {
		        map.removeLayer(layerParty);
		    } else {
		        layerParty.addTo(map);
		    }
		});

		$("#beer").click(function () {
		    if (map.hasLayer(beers)) {
		        map.removeLayer(beers);
		    } else {
		        beers.addTo(map);
		    }
			 if (map.hasLayer(layerBeer)) {
		        map.removeLayer(layerBeer);
		    } else {
		        layerBeer.addTo(map);
		    }
		});

		$("#all").click(function () {
		    if (map.hasLayer(beers) && map.hasLayer(concerts) && map.hasLayer(partys)) {
		        map.removeLayer(beers);
		        map.removeLayer(concerts);
		        map.removeLayer(partys);
				
				map.removeLayer(layerBeer);
		        map.removeLayer(layerGuitar);
		        map.removeLayer(layerParty);
				//deleteAllMarkerandPopups();
				
		    } else {
		        beers.addTo(map);
		        concerts.addTo(map);
		        partys.addTo(map);
				
				//addPopup(51.9629, 7.6286, 'Gorilla Bar', "GorillaBar","beer", "Mon - Thu: 20.00 - 02.00,Fri - Sat: 20.00 - 03.00", 'Juedefelderstr. 54,48143 MUENSTER', 'info@gorilla-bar.de', '0251-4882188', 'http://www.gorilla-bar.de/', "gorilla1.jpg,gorilla2.jpg");
		        //addPopup(51.961, 7.65, 'Cavete', "Cavete","party", "Mon - Thu: 20.00 - 02.00,Fri - Sat: 20.00 - 03.00", 'Juedefelderstr. 54,48143 MUENSTER', 'info@gorilla-bar.de', '0251-4882188', 'http://www.gorilla-bar.de/', "gorilla1.jpg,gorilla2.jpg");
				addLayerofMarkers();
		    }
		});

		 // Move button used to open the sidebar when the sidebar is opened/closed 
		$("#leftpanel2").on("panelbeforeopen", function (e) {
		    var w = $("#leftpanel2").width();
		    w = "+=" + w + "px";
		    $("#open_sb").animate({
		        "left": w
		    }, 250);
		});

		$("#leftpanel2").on("panelbeforeclose", function (e) {
		    var w = $("#leftpanel2").width();
		    w = "-=" + w + "px";
		    $("#open_sb").animate({
		        "left": w
		    }, 220);
		});
		
		function moveTo(){
			map.setView([51.96602, 7.61879],18);
		}