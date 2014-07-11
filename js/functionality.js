		// icon representing pubs on the map
		var beerIcon = L.icon({
		    iconUrl: 'css/images/beer3.png',
		    iconSize: [20, 20], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});
		
		// icon for nightview
		var beerIconN = L.icon({
		    iconUrl: 'css/images/beer.png',
		    iconSize: [20, 20], // size of the icon
		    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
		        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});


		// delete markers and popups
		function deleteAllMarkerandPopups() {
		    $("[id^=popup_]").remove();
		    map.removeLayer(markers);
			markers.clearLayers();
		    popups=new Array();
		}

		function openResultOfBar() {
		    // scroll to position zero first
		    $(".ui-panel-inner").scroll();
		    $('.ui-panel-inner').animate({scrollTop: 0}, 0);
		    var id = $(this).attr("id");
		    id = "#"+id.split("_")[1];
		    $("#popup_" + id).popup("close");
		    $("#leftpanel2").panel("open");
		    $(id).collapsible("expand");
		    var position = parseInt($(id).position().top);
		    var offset = $(this).offset().top;
		    //console.log('position: ' + position)
		    //console.log('offset: ' + offset)
		    // now scroll to position of entry
		    $(".ui-panel-inner").scroll();
		    $('.ui-panel-inner').animate({scrollTop: position}, 0);
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
		function putPopupsOnMap(){
		while(popups.length!=0){
		var popup=popups.pop();
		$("#mapElements").append(popup);
		}
		$.mobile.activePage.trigger("create");
		$("[id^='popupResultLink']").click(openResultOfBar);
		}
        var popups=new Array();
		function addPopup(lat, lng, pubName, id, type, opening_hours, adress, e_mail, phone, website, tuc) {
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
			var picture="";
	        
			//create popup element
		    var popup = "<div data-role='popup' id='popup_" + id + "' class='ui-content ' data-arrow='true'><a data-rel='back' data-role='button' data-theme='a' data-icon='delete' data-iconpos='notext' class='ui-btn-right'/><p align='center'><a>" + pubName + "</a></p><table style='border-spacing: 15px 0px'><tr><td valign='top'><b>Time until close</b> </td><td>" + tuc + "</td></tr><tr><td valign='top'><b>Opening hours </b> </td><td>" + openingHours + "</td></tr><tr><td valign='top'><b>Adress</b></td><td>" + adress + " </td></tr><tr><td valign='top'><b>Phone number</b></td><td>" + phone + "</td></tr><tr><td valign='top'><b>Mail adress</b></td><td>" + e_mail + "</td></tr><tr valign='top'><td><b>Website</b></td><td><a href='" + website + "' style='font-weight:normal'>" + website + "</a>  </td></tr><tr><th  colspan='2' align='left'><a id='popupResultLink_" + id + "'>More information</a></th></tr></table><p id='picture_"+id+"' align='center'>" + picture+ "</p></div>";
		    popups.push(popup);
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
				var picture=$("#picture_"+id).html();
				if(picture==""){
				  $.ajax({
                  url:'pubs/thumb/'+id + '.png',
                  type:'HEAD',
			      async: false,
                  success: function(){
                  picture =  "<img src='pubs/thumb/" + id + ".png' style = 'height:80px;'/>";
				  $("#picture_"+id).html(picture);
                  }
                  });
			     }
		        $("#popup_" + id + "").popup('open', {
		            x: x + iconPopupWidth,
		            y: y + iconPopupHeight,
					
		        });
		    });
			
		}
	
		
		var popup = L.popup();

		function onMapClick(e) {}

		map.on('click', onMapClick);

		// quick queries
		// cheapest beer
		$("#price").click(function () {
			deleteAllMarkerandPopups()
			ajaxrequest("http://giv-openpubguide.uni-muenster.de:8080/de.ifgi.ohbpgiosm/rest/pubs/getpubswithinbbox?south=51.95&west=7.6&north=51.967&east=7.644&filter=maximumBeerPrice=2")
			$("#leftpanel2").panel("open");
		});
		
		// all opened pubs
		$("#open").click(function () {
			deleteAllMarkerandPopups()
			ajaxrequest("http://giv-openpubguide.uni-muenster.de:8080/de.ifgi.ohbpgiosm/rest/pubs/getpubswithinbbox?south=51.95&west=7.6&north=51.967&east=7.644")
			$("#leftpanel2").panel("open");
		});
		
		// pubs serving food
		$("#food").click(function () {
			deleteAllMarkerandPopups()
			ajaxrequest("http://giv-openpubguide.uni-muenster.de:8080/de.ifgi.ohbpgiosm/rest/pubs/getpubswithinbbox?south=51.95&west=7.6&north=51.967&east=7.644&filter=hasFood")
			$("#leftpanel2").panel("open");
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
			
				var pictureID;
				if ( !doesFileExist("http://localhost/OSMPubGuide/pubs/thumb/"+pubArray[i].id + ".png")){
					pictureID = 0;
				}
				else{
					pictureID = pubArray[i].id
				}
				
				var content = '<div data-role="collapsible" id="'+pubArray[i].id+'">' +
					'<h3>'+pubArray[i].pubname+'</h3></br>' +
					'<p class = "entry"><b>Adress:</b> '+pubArray[i].street+' ' + pubArray[i].housenr + ', ' + pubArray[i].city +'</p>' +					
					'<p class = "entry"><b>Open:</b> '+pubArray[i].opening_hours+'</p>' +
					'<p class = "entry"><b>Closed in </b> '+pubArray[i].tuc+' minutes</p>' +
					'<p class = "entry"><b>Happy hour: </b>'+pubArray[i].happy_hour+'</p>' +
					'<p class = "entry"><b>Cheapest beer: </b>'+pubArray[i].beerprice+'</p>' +					
					'<a href="'+pubArray[i].website+'" target="_blank">Website</a></p>' +
					'<p class = "entry"><b>Telephone:</b> '+pubArray[i].phone+'</p>' +
					'<p class = "entry"><b>Mail: </b>'+pubArray[i].email+'</p>' +
					'<p class = "entry"><b>Food: </b>'+pubArray[i].food+'</p>' +
					'<p class = "entry"><b>Barrier free: </b>'+pubArray[i].wheelchair+'</p>' +
					'<img src="pubs/thumb/'+pictureID+'.png" style="width:50%;" /></br>' +
					'<button onclick="moveTo('+pubArray[i].lat+','+pubArray[i].lng+','+pubArray[i].id+');">Move to</button></div>';

				$("#result").append(content).collapsibleset("refresh");
				
			}
		}
		
		function moveTo(lat,lng,id) {
		    map.setView([lat, lng], 20);
			$("#popup_" + id + "").popup('open');
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
	
