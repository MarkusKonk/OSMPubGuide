		// icon representing pubs on the map
		var beerIcon = L.icon({
		    iconUrl: 'css/images/beer3.ico',
		    iconSize: [20, 20], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});


		//Popup
		//marker types
		var layerPrice = L.layerGroup();
		var layerOpen = L.layerGroup();
		var layerFood = L.layerGroup();

		function addLayerofMarkers() {
		    layerPrice.addTo(map);
		    layerOpen.addTo(map);
		    layerFood.addTo(map);
		}

		function deleteAllMarkerandPopups() {
		    $("[id^=popup_]").remove();
		    map.removeLayer(layerPrice);
		    map.removeLayer(layerOpen);
		    map.removeLayer(layerFood);
		    layerPrice = L.layerGroup();
		    layerOpen = L.layerGroup();
		    layerFood = L.layerGroup();
		}

		function openResultOfBar() {
		    var id = $(this).attr("id");
		    id = id.split("_")[1];
		    $("#popup_" + id).popup("close");
		    id = "#result_" + id;
		    $("#leftpanel2").panel("open");
		    $(id).collapsible("expand");
		    var position = parseInt($(id).position().top);
		    $(".ui-panel-inner").scroll();
		    $('.ui-panel-inner').animate({scrollTop: position}, 2000);
		}

		var markers = new L.MarkerClusterGroup({ 
			spiderfyOnMaxZoom: true, 
			showCoverageOnHover: true, 
			zoomToBoundsOnClick: true,
		
			iconCreateFunction: function (cluster) {
				var markers = cluster.getAllChildMarkers();

				return L.divIcon({ html: markers.length, className: 'mycluster', iconSize: L.point(40, 40) })
				}
			});			
		
		function addMarker(marker, type) {
		    var iconSize = null;
			
		    if (type == "guitar") {
		        marker.setIcon(beerIcon);
		        marker.addTo(layerPrice);
		        iconSize = beerIcon.options.iconSize;
		    } else {
		        if (type == "party") {
		            marker.setIcon(beerIcon);
		            marker.addTo(layerOpen);
		            iconSize = beerIcon.options.iconSize;
		        } else {
		            if (type == "beer") {
		                marker.setIcon(beerIcon);
		                marker.addTo(layerFood);
		                iconSize = beerIcon.options.iconSize;
		            }
		        }
		    }
			markers.addLayer(marker);
			markers.addTo(map);
			
		    return iconSize;
		}

		function addPopup(lat, lng, pubName, id, type, opening_hours, adress, e_mail, phone, website, images) {
		    var marker = L.marker();
		    marker.setLatLng([lat, lng]);

		    //adress	
		    if (adress != ',,,') {
		        var adresses = adress.split(',');
		        var adress = "";
		        for (var p in adresses) {
		            adress = adress + adresses[p] + "<br>";
		        }
		    }

		    //opening hours
		    if (opening_hours != '') {
		        var opening = opening_hours.split(',');
		        var openingHours = "<table>";
		        for (var i = 0; i < opening.length; i++) {
		            var openArray = opening[i].split(":");
		            openingHours = openingHours + "<tr><td>" + openArray[0] + ":</td>";
		            openingHours = openingHours + "<td>" + openArray[1] + "</td></tr>";
		        }
		        openingHours = openingHours + " </table>";
		    }

		    //images
		    if (images != ' ') {
		        var pictures = images.split(',');
		        var images = "";
		        for (var i = 0; i < pictures.length; i++) {
		            images = images + "<img src=" + pictures[i] + " style = 'height:80px;'/>";
		        }
		    }
		    
			//create popup element
		    var popup = "<div data-role='popup' id='popup_" + id + "' class='ui-content ' data-arrow='true'><a data-rel='back' data-role='button' data-theme='a' data-icon='delete' data-iconpos='notext' class='ui-btn-right'/><p align='center'><a>" + pubName + "</a></p><table style='border-spacing: 15px 0px'><tr><td valign='top'><b>Opening hours </b> </td><td>" + openingHours + "</td></tr><tr><td valign='top'><b>Adress</b></td><td>" + adress + " </td></tr><tr><td valign='top'><b>Phone number</b></td><td>" + phone + "</td></tr><tr><td valign='top'><b>Mail adress</b></td><td>" + e_mail + "</td></tr><tr valign='top'><td><b>Website</b></td><td><a href='" + website + "' style='font-weight:normal'>" + website + "</a>  </td></tr><tr><th  colspan='2' align='left'><a id='popupResultLink_" + id + "'>More information</a></th></tr></table><p align='center'>" + images + "</p></div>";
		    if ($.mobile.activePage == null) {
		        $("#mapElements").append(popup);
		    } else {
		        $.mobile.activePage.append(popup);
		        $.mobile.activePage.trigger("create");
		    }
		    //$.mobile.activePage.append( popup ).trigger( "pagecreate" );
		    //add marker an return icon width and height
		    type = "beer";
		    var iconSize = addMarker(marker, type);
		    var iconPopupWidth = parseInt(iconSize[0] / 2);
		    var iconPopupHeight = parseInt(iconSize[1] / 2);
		    // bind popup to marker
		    marker.on('click', function (e) {
		        var m = e.target;
		        var x = map.latLngToContainerPoint(m.getLatLng(), zoom).x;
		        var y = map.latLngToContainerPoint(m.getLatLng(), zoom).y;
		        $("#popup_" + id + "").popup('open', {
		            x: x + iconPopupWidth,
		            y: y + iconPopupHeight
		        });
		    });

		    //missing: add Popup also to right layer


		    //set link to result on sidebar
		    $("#popupResultLink_" + id + "").click(openResultOfBar);

		    if (type == "beer") {
		        $("#food").click();
		    }
		}

		//add dynamically popup
		addPopup(51.96602, 7.61879, 'Gorilla Bar', "GorillaBar", "beer", "Mon - Thu: 20.00 - 02.00,Fri - Sat: 20.00 - 03.00", 'Juedefelderstr. 54,48143 MUENSTER', 'info@gorilla-bar.de', '0251-4882188', 'http://www.gorilla-bar.de/', "gorilla1.jpg,gorilla2.jpg");
		addPopup(51.961, 7.65, 'Cavete', "Cavete", "party", "Mon - Thu: 20.00 - 02.00,Fri - Sat: 20.00 - 03.00", 'Juedefelderstr. 54,48143 MUENSTER', 'info@gorilla-bar.de', '0251-4882188', 'http://www.gorilla-bar.de/', "gorilla1.jpg,gorilla2.jpg");
		 //addLayerofMarkers();
		 //Popup end
		 
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
		
		
		var popup = L.popup();

		function onMapClick(e) {}

		map.on('click', onMapClick);

		var price1 = L.marker([51.96712, 7.60331], {
		        icon: beerIcon
		    }).bindPopup(''),
		    price2 = L.marker([51.96801, 7.64451], {
		        icon: beerIcon
		    }).bindPopup(''),
		    price3 = L.marker([51.95437, 7.62983], {
		        icon: beerIcon
		    }).bindPopup(''),
		    price4 = L.marker([51.97626, 7.62451], {
		        icon: beerIcon
		    }).bindPopup('');
		var open1 = L.marker([51.97552, 7.58769], {
		        icon: beerIcon
		    }).bindPopup(''),
		    open2 = L.marker([51.97325, 7.58666], {
		        icon: beerIcon
		    }).bindPopup(''),
		    open3 = L.marker([51.96188, 7.62546], {
		        icon: beerIcon
		    }).bindPopup(''),
		    open4 = L.marker([51.95913, 7.62185], {
		        icon: beerIcon
		    }).bindPopup('');
		var food1 = L.marker([51.97769, 7.64142], {
		        icon: beerIcon
		    }).bindPopup(''),
		    food2 = L.marker([51.96569, 7.66125], {
		        icon: beerIcon
		    }).bindPopup(''),
		    food3 = L.marker([51.95876, 7.63653], {
		        icon: beerIcon
		    }).bindPopup(''),
		    food4 = L.marker([51.96251, 7.61335], {
		        icon: beerIcon
		    }).bindPopup('');

		var price = L.layerGroup([price1, price2, price3, price4]);
		var open = L.layerGroup([open1, open2, open3, open4]);
		var food = L.layerGroup([food1, food2, food3, food4]);

		var overlayMaps = {
		    "Price": price,
		    "Open": open,
		    "Food": food
		};

		$("#price").click(function () {
		    if (map.hasLayer(price)) {
		        map.removeLayer(price);
		    } else {
		        price.addTo(map);
		    }
		    if (map.hasLayer(layerPrice)) {
		        map.removeLayer(layerPrice);
		    } else {
		        layerPrice.addTo(map);
		    }
		});

		$("#open").click(function () {
		    if (map.hasLayer(open)) {
		        map.removeLayer(open);
		    } else {
		        open.addTo(map);
		    }
		    if (map.hasLayer(layerOpen)) {
		        map.removeLayer(layerOpen);
		    } else {
		        layerOpen.addTo(map);
		    }
		});

		$("#food").click(function () {
		    if (map.hasLayer(food)) {
		        map.removeLayer(food);
		    } else {
		        food.addTo(map);
		    }
		    if (map.hasLayer(layerFood)) {
		        map.removeLayer(layerFood);
		    } else {
		        layerFood.addTo(map);
		    }
		});

		$("#all").click(function () {
		    if (map.hasLayer(food) && map.hasLayer(price) && map.hasLayer(open)) {
		        map.removeLayer(food);
		        map.removeLayer(price);
		        map.removeLayer(open);

		        map.removeLayer(layerFood);
		        map.removeLayer(layerPrice);
		        map.removeLayer(layerOpen);
		        //deleteAllMarkerandPopups();

		    } else {
		        food.addTo(map);
		        price.addTo(map);
		        open.addTo(map);

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
		    var day = "";
		    var hours = "";
		    var minutes = "";
		    if ((parseInt(now.getMonth()) + 1) < 10) month = "0" + parseInt(now.getMonth() + 1);
		    else month = parseInt(now.getMonth() + 1);
		    if ((parseInt(now.getDate()) < 10)) day = "0" + parseInt(now.getDate());
		    else day = parseInt(now.getDate());
		    if ((parseInt(now.getHours()) < 10)) hours = "0" + parseInt(now.getHours());
		    else hours = parseInt(now.getHours());
		    if ((parseInt(now.getMinutes())) < 10) minutes = "0" + parseInt(now.getMinutes());
		    else minutes = parseInt(now.getMinutes());
		    tnow = now.getFullYear() + "-" + month + "-" + day + "T" + hours + ":" + minutes;
		    return tnow;
		}

		 // set current date and time as default value in the datepicker
		$("#datePickerStart").val(getnow());

		function createResultList(pubs){
			var pubArray = pubs;
			console.log(pubArray.length);

			$("#query").collapsible("option", "collapsed", true);
			document.getElementById("result_text").style.display = "block";
			deleteResults();

			for (var i = 0; i < pubArray.length; i++){
				var content = '<div data-role="collapsible-set" data-theme="a" data-content-theme="a"><div data-role="collapsible" id="'+pubArray[i].pubname+'">' +
					'<h3>'+pubArray[i].pubname+'</h3></br>' +
					'<p class = "entry"><b>Adress:</b> '+pubArray[i].street+' ' + pubArray[i].housenr + ', ' + pubArray[i].city +'</p>' +					
					'<p class = "entry"><b>Open:</b> '+pubArray[i].opening_hours+'</p>' +
					'<p class = "entry"><b>Closed in </b> '+pubArray[i].tuc+' minutes</p>' +
					'<p class = "entry"><b>Happy hour: </b>'+pubArray[i].happy_hour+'</p>' +
					'<p class = "entry"><b>Cheapest beer: </b>'+pubArray[i].beerprice+'</p>' +					
					'<a href="'+pubArray[i].website+'">Website</a></p>' +
					'<p class = "entry"><b>Telephone:</b> '+pubArray[i].phone+'</p>' +
					'<p class = "entry"><b>Mail: </b>'+pubArray[i].email+'</p>' +
					'<p class = "entry"><b>Food: </b>'+pubArray[i].food+'</p>' +
					'<p class = "entry"><b>Barrier free: </b>'+pubArray[i].wheelchair+'</p>' +
					'<img src="gorilla.jpg" style="width:30%;" /></br>' +
					'<button onclick="moveTo('+pubArray[i].lat+','+pubArray[i].lng+');">Move to</button></div>';

				$("#result").append(content).collapsibleset("refresh");
				
			}
		}
		
		function moveTo(lat,lng) {
		    map.setView([lat, lng], 18);
		}
		
		
		function deleteResults() {
		    document.getElementById("result").innerHTML = "";
		}
		
		// Add functionality for adding the BBox-Tool
		if (b_box) {
			// Add it to the map
			var areaSelect = L.areaSelect({width:200, height:300});
			areaSelect.addTo(map);
			
			// Read the bouding box
			var bounds = areaSelect.getBounds();
			
			// Get a callback when the bounds change
			areaSelect.on("change", function() {
			    console.log("Southwest:", this.getBounds()._southWest.lat, this.getBounds()._southWest.lng,
					" Northeast:", this.getBounds()._northEast.lat, this.getBounds()._northEast.lng);
			});
		}