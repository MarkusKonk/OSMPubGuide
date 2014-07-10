		// icon representing pubs on the map
		var beerIcon = L.icon({
		    iconUrl: 'css/images/beer3.ico',
		    iconSize: [20, 20], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});
		
		// icon for nightview
		var beerIconN = L.icon({
		    iconUrl: 'css/images/beer4.ico',
		    iconSize: [20, 20], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});


		// delete markers and popups
		function deleteAllMarkerandPopups() {
		    $("[id^=popup_]").remove();
		    map.removeLayer(markers);
			markers.clearLayers();
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

		var markers = new L.MarkerClusterGroup();			
		
		function addMarker(marker, type) {
		    var iconSize = null;
		    marker.setIcon(beerIcon);
		    iconSize = beerIcon.options.iconSize;
			markers.addLayer(marker);
			markers.addTo(map);			
		    return iconSize;
		}

		function addPopup(lat, lng, pubName, id, type, opening_hours, adress, e_mail, phone, website, images, tuc) {
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
		    //set link to result on sidebar
		    $("#popupResultLink_" + id + "").click(openResultOfBar);
		}
	
		
		var popup = L.popup();

		function onMapClick(e) {}

		map.on('click', onMapClick);

		// quick queries
		// cheapest beer
		$("#price").click(function () {
			deleteAllMarkerandPopups()
			ajaxrequest("http://giv-openpubguide.uni-muenster.de:8080/de.ifgi.ohbpgiosm/rest/pubs/getpubswithinbbox?south=51.95&west=7.6&north=51.967&east=7.644&filter=maximumBeerPrice=2")
		});
		
		// all opened pubs
		$("#open").click(function () {
			deleteAllMarkerandPopups()
			ajaxrequest("http://giv-openpubguide.uni-muenster.de:8080/de.ifgi.ohbpgiosm/rest/pubs/getpubswithinbbox?south=51.95&west=7.6&north=51.967&east=7.644")
		});
		
		// pubs serving food
		$("#food").click(function () {
			deleteAllMarkerandPopups()
			ajaxrequest("http://giv-openpubguide.uni-muenster.de:8080/de.ifgi.ohbpgiosm/rest/pubs/getpubswithinbbox?south=51.95&west=7.6&north=51.967&east=7.644&filter=hasFood")
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



		function createResultList(pubs){
			var pubArray = pubs;

			$("#query").collapsible("option", "collapsed", true);
			document.getElementById("result_text").style.display = "block";
			deleteResults();
			
			for (var i = 0; i < pubArray.length; i++){
			/*
				var pictureID;
				if ( !doesFileExist("http://giv-openpubguide.uni-muenster.de/pubs/"+pubArray[i].id + ".png")){
					pictureID = 0;
				}
				else{
					pictureID = pubArray[i].id
				}*/
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
					//'<img src="pubs/'+pictureID+'.png" style="width:50%;" /></br>' +
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
		
		
	function doesFileExist(urlToFile)
		{
			var xhr = new XMLHttpRequest();
			xhr.open('HEAD', urlToFile, false);
			xhr.send();
			 
			if (xhr.status == "404") {
				return false;
			} else {
				return true;
			}
		}
		
		
		// change icon on nightview
		map.on('baselayerchange',function(e){
			changeIcon()
		});
		
		map.on('layeradd',function(e){
			changeIcon()
		});
		
		function changeIcon() {
			if (!map.hasLayer(day)) {
				for (var i in markers.getLayers()){
					markers.getLayers()[i].setIcon(beerIconN);
				}
			} else {
				for (var i in markers.getLayers()){
					markers.getLayers()[i].setIcon(beerIcon);
				}
			}
		}