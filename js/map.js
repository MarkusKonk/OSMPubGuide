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
			
		var bus_stops = new L.tileLayer('http://openpubguide-tile.uni-muenster.de/tiles_demo/mbtiles.php?db=bus_stop_labeled.mbtiles&z={z}&x={x}&y={y}', {
		tms: true,
		minZoom: 14,
		maxZoom:18,
		});
			
		var atm = new L.tileLayer('http://openpubguide-tile.uni-muenster.de/tiles_demo/mbtiles.php?db=ACM.mbtiles&z={z}&x={x}&y={y}', {
			tms: true,
			minZoom: 14,
			maxZoom:18,
		});	


		// map definition
		var map = L.map('map', {
		    zoomControl: false,
		    center: [lat, lon],
		    zoom: zoom,
		    layers: [osm]
		})
		
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

		 map.addControl(L.control.zoom({
		    position: zoomPosition
		}));

		var baseLayers = {
		    "OpenStreetMap Mapnik": osm,
		    "OpenStreetMap MapQuest": mapquest,
			"OpenStreetMap Humanitarian": humanitarian
		};
		
		var overlays = {
			"Busstops": bus_stops,
			"atm": atm
		};
		
		
		
		var layersControl = new L.Control.Layers(baseLayers, overlays);
		map.addControl(layersControl);
		
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
			
		function openResultOfBar(){
        var id=$(this).attr("id");
		id=id.split("_")[1];
		 $("#popup_"+id).popup("close");
		id="#result_"+id;
		$("#leftpanel2").panel( "open");
        $(id).collapsible( "expand" );
		var position = parseInt($(id).position().top);
		$("#leftpanel2").scroll();
		$('#leftpanel2').animate({ scrollTop: position}, 2000);
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
				
		        var popup="<div data-role='popup' id='popup_" + id + "' class='ui-content ' data-arrow='true'><a data-rel='back' data-role='button' data-theme='a' data-icon='delete' data-iconpos='notext' class='ui-btn-right'/><p align='center'><a>" + pubName + "</a></p><table style='border-spacing: 15px 0px'><tr><td valign='top'><b>Opening hours </b> </td><td>" + openingHours + "</td></tr><tr><td valign='top'><b>Adress</b></td><td>" + adress + " </td></tr><tr><td valign='top'><b>Phone number</b></td><td>" + phone + "</td></tr><tr><td valign='top'><b>Mail adress</b></td><td>" + e_mail + "</td></tr><tr valign='top'><td><b>Website</b></td><td><a href='" + website + "' style='font-weight:normal'>" + website + "</a>  </td></tr><tr><th  colspan='2' align='left'><a id='popupResultLink_"+id+"'>More information</a></th></tr></table><p align='center'>" + images + "</p></div>";
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
		       //set link to result on sidebar
			   $("#popupResultLink_"+id+"").click(openResultOfBar);
		    }
		
			
		    //add dynamically popup
		addPopup(51.96602, 7.61879, 'Gorilla Bar', "GorillaBar","beer", "Mon - Thu: 20.00 - 02.00,Fri - Sat: 20.00 - 03.00", 'Juedefelderstr. 54,48143 MUENSTER', 'info@gorilla-bar.de', '0251-4882188', 'http://www.gorilla-bar.de/', "gorilla1.jpg,gorilla2.jpg");
		addPopup(51.961, 7.65, 'Cavete', "Cavete","party", "Mon - Thu: 20.00 - 02.00,Fri - Sat: 20.00 - 03.00", 'Juedefelderstr. 54,48143 MUENSTER', 'info@gorilla-bar.de', '0251-4882188', 'http://www.gorilla-bar.de/', "gorilla1.jpg,gorilla2.jpg");
        //addLayerofMarkers();
		 //Popup end
		 //introStart
		 var intro = introJs();  
		 intro.setOptions({  
    steps: [  
        {  
          element: '#search',  
          intro: 'To start your query click on this button. Then the panel opens.',  
          position: 'top'  ,
		  
        },
		{  
          intro: 'With this panel you can decide for what kind of pub you would like to search.',  
        },
		
		 {  
          element: '.ui-grid-d',  
          intro: 'With this button and the two more left you can decide which kind of pubs should be shown in the map',  
          position: 'top'  ,
		  
        },
		  {  
          element: '.leaflet-control-geosearch',  
          intro: 'Here you can serach for streets and pubs and more OSM Elements',  
          position: 'bottom'  ,
		  
        },
		 {  
          element: '.leaflet-control-locate',  
          intro: 'With this button you can find your actual location.',  
          position: 'bottom'  ,
		  
        },
		 {  
          element: '.leaflet-control-zoom',  
          intro: 'With this button you can zoom in and out of the map.',  
          position: 'left'  ,
		  
        },
		 {  
          element: '.leaflet-control-layers',  
          intro: 'Here you can choose different maps.',  
          position: 'left'  ,
		  
        },
       
    ] ,"showStepNumbers":"no",
	
}); 
intro.onchange(function(targetElement) { 

  if(targetElement.className=="introjsFloatingElement"){
  $('#leftpanel2').panel( 'open');
  $(".introjs-overlay").css("opacity","0");
 }
  else{
  $('#leftpanel2').panel( 'close');
   $(".introjs-overlay").css("opacity","1");
    
  }
  
  	
});

intro.onbeforechange(function(targetElement) { 
 if(targetElement.className=="ui-grid-d"){
intro.setOption('tooltipClass','custom');
}
else{
intro.setOption('tooltipClass','');
}
	});	 
		 
		 //IntroEnd
		var popup = L.popup();

		function onMapClick(e) {
		}

		map.on('click', onMapClick);


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
		    var w = $("#leftpanel2").width() + 30; //ui panel inner has padding of 15px
		    w = "+=" + w + "px";
		    $("#open_sb").animate({
		        "left": w
		    }, 250);
		});

		$("#leftpanel2").on("panelbeforeclose", function (e) {
		    var w = $("#leftpanel2").width() + 30;
		    w = "-=" + w + "px";
		    $("#open_sb").animate({
		        "left": w
		    }, 220);
		});
		
		function moveTo(){
			map.setView([51.96602, 7.61879],18);
		}
		
		// No Scrollbar
		$('html, body').css({
		'overflow': 'hidden',
		'height': '100%'
		})
		
		// gets current date and time
		function getnow() {
			var now = new Date();
			var tnow = "";
			var month = "";
			var minutes = "";
			if ((parseInt(now.getMonth())+1) < 10) month = "0" + parseInt(now.getMonth()+1); 
				else month = parseInt(now.getMonth()+1);
			if ((parseInt(now.getMinutes())) < 10) minutes = "0" + parseInt(now.getMinutes()); 
				else minutes = parseInt(now.getMinutes());
			tnow = now.getFullYear() + "-" + month + "-" + now.getDate() + "T" + now.getHours() + ":" + minutes;
			return tnow;
		}

		// set current date and time as default value in the datepicker
		$("#datePickerStart").val(getnow());
		
		$("#submit").click(function () {
				$("#query").collapsible( "option", "collapsed", true );
				document.getElementById("result_text").style.display = "block";
				deleteResults();
				var content = '<div data-role="collapsible-set" data-theme="a" data-content-theme="a"><div data-role="collapsible" id="result_GorillaBar">'+
								'<h3>Gorilla Bar</h3>'+
								'<p>Opening hours: 20-03 Uhr</p>'+
								'<p>Happy Hour: -</p>'+
								'<p>Website:	</p>'+
								'<a href="http://gorillabar.de/">link</a></p>'+
								'<p>Telephone: 0123456789</p>'+
								'<img src="gorilla.jpg" style="width:30%;" /></br>'+
								'<button onclick="moveTo();">Move to</button></div>'+
								'</div><div data-role="collapsible"><h3>Jovel</h3><p>I am the collapsible content for section 2</p>'+
								'</div><div data-role="collapsible" id="result_Cavete2"><h3>Cavete</h3><p>I am the collapsible content for section 3</p></div></div>'+
                                '</div><div data-role="collapsible"><h3>Jovel</h3><p>I am the collapsible content for section 2</p>'+
								'</div><div data-role="collapsible" id="result_Cavete2"><h3>Cavete</h3><p>I am the collapsible content for section 3</p></div></div>'+
                                '</div><div data-role="collapsible"><h3>Jovel</h3><p>I am the collapsible content for section 2</p>'+
								'</div><div data-role="collapsible" id="result_Cavete2"><h3>Cavete</h3><p>I am the collapsible content for section 3</p></div></div>'+
                                '</div><div data-role="collapsible"><h3>Jovel</h3><p>I am the collapsible content for section 2</p>'+
								'</div><div data-role="collapsible" id="result_Cavete"><h3>Cavete</h3><p>I am the collapsible content for section 3</p></div></div>'+
                                '</div><div data-role="collapsible"><h3>Jovel</h3><p>I am the collapsible content for section 2</p>'+
								'</div><div data-role="collapsible" id="result_Cavete2"><h3>Cavete</h3><p>I am the collapsible content for section 3</p></div></div>'+
                                '</div><div data-role="collapsible"><h3>Jovel</h3><p>I am the collapsible content for section 2</p>'+
								'</div><div data-role="collapsible" id="result_Cavete2"><h3>Cavete</h3><p>I am the collapsible content for section 3</p></div></div>'+
                                '</div><div data-role="collapsible"><h3>Jovel</h3><p>I am the collapsible content for section 2</p>'+
								'</div><div data-role="collapsible" id="result_Cavete2"><h3>Cavete</h3><p>I am the collapsible content for section 3</p></div></div>'+
                                '</div><div data-role="collapsible"><h3>Jovel</h3><p>I am the collapsible content for section 2</p>'+
								'</div><div data-role="collapsible" id="result_Cavete"><h3>Cavete</h3><p>I am the collapsible content for section 3</p></div></div>'+
                                '</div><div data-role="collapsible"><h3>Jovel</h3><p>I am the collapsible content for section 2</p>'+
								'</div><div data-role="collapsible" id="result_Cavete"><h3>Cavete</h3><p>I am the collapsible content for section 3</p></div></div>';							
							$( "#result" ).append( content ).collapsibleset( "refresh" );
		});
		
		function deleteResults(){
			document.getElementById("result").innerHTML = "";
		}