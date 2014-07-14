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
		
		//for desktop applications use another date and time picker
		var appname = navigator.userAgent.toLowerCase();
		if(appname.search("mobile")==-1){
		$('#datePickerStart').replaceWith("<input id='datePickerStart' data-theme='a' />");
		$('#datePickerEnd').replaceWith("<input id='datePickerEnd' data-theme='a'/>");
        $('#datePickerStart').datetimepicker();
		$('#datePickerEnd').datetimepicker();
		}
		
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
		    id = id.split("_")[1];
		    $("#popup_" + id).popup("close");
			id="#"+id;
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
   function loadPicture(id){
		var picture=$("#picture_"+id).html();
				if(picture==""){
				  $.ajax({
                  url:'pubs/thumb/'+id + '.jpg',
                  type:'HEAD',
			      async: false,
                  success: function(){
                  picture =  "<img src='pubs/thumb/" + id + ".jpg' style = 'height:80px;'/>";
				  $("#picture_"+id).html(picture);
                  }
                  });
			     }
		
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
		    if (adress != ',,,'|adress!="undifined") {
		        var adresses = adress.split(/,|;/);
		        var adress = "";
		        for (var p in adresses) {
		            adress = adress + adresses[p] + "<br>";
		        }
		    }
		    //opening hours
		    if (opening_hours != ''|opening_hours!="undifined") {
		        var opening = opening_hours.split(/,|;/);
		        var openingHours = "<table>";
		        for (var i = 0; i < opening.length; i++) {
		            var openArray = opening[i].match(/[A-Za-z]+-[A-Za-z]+|[A-Za-z]+\s+[A-Za-z]+|[A-Za-z]+/);
					if(openArray){
		            openingHours = openingHours + "<tr><td>" + openArray + ":</td>";
					}
					openArray = opening[i].match(/[0-9:]+-[0-9:]+|[0-9:+]+/);
					if(openArray){
		            openingHours = openingHours + "<td>" + openArray + "</td></tr>";
					}
					
		        }
		        openingHours = openingHours + " </table>";
		    }
			var picture="";
	        if(website.search("www")!=-1&&website.search("http")==-1){
			website="http://"+website;
			}
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
				loadPicture(id);
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
			$("#datePickerStart").val(getnow());
			var start = $("#datePickerStart").val();
			query = "http://giv-openpubguide.uni-muenster.de:8080/OSMPubGuide-WS/tosm/query?bbox=51.95,7.6,51.967,7.644" +"&start=" + start +":00&filter=maximumBeerPrice=2";
			ajaxrequest(query)
			$("#leftpanel2").panel("open");
		});
		
		// all opened pubs
		$("#open").click(function () {
			deleteAllMarkerandPopups()
			$("#datePickerStart").val(getnow());
			var start = $("#datePickerStart").val();
			query = "http://giv-openpubguide.uni-muenster.de:8080/OSMPubGuide-WS/tosm/query?bbox=51.95,7.6,51.967,7.644" +"&start=" + start +":00";
			ajaxrequest(query)
			$("#leftpanel2").panel("open");
		});
		
		// pubs serving food
		$("#food").click(function () {
			deleteAllMarkerandPopups()
			$("#datePickerStart").val(getnow());
			var start = $("#datePickerStart").val();
			query = "http://giv-openpubguide.uni-muenster.de:8080/OSMPubGuide-WS/tosm/query?bbox=51.95,7.6,51.967,7.644" +"&start=" + start +":00&filter=hasFood";
			ajaxrequest(query)
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
			
			$("#query").collapsible("option", "collapsed", true);
			document.getElementById("result_text").style.display = "block";
			deleteResults();
			
			for (var key in pubs){
				var eventContent = '';
				if (pubs[key].events.length > 0){
					var eventContent = '<p class = "entry"><b>Event: </b>'+pubs[key].events[0].name+', '+pubs[key].events[0].type+', '+pubs[key].events[0].start+'</p>';					
				}
				var content = '<div data-role="collapsible" id="'+pubs[key].id+'">' +
					'<h3>'+pubs[key].pubname+'</h3></br>' +
					'<p class = "entry"><b>Adress:</b> '+pubs[key].street+' ' + pubs[key].housenr + ', ' + pubs[key].city +'</p>' +					
					'<p class = "entry"><b>Open:</b> '+pubs[key].opening_hours+'</p>' +
					'<p class = "entry"><b>Closed in </b> '+pubs[key].tuc+' minutes</p>' +
					'<p class = "entry"><b>Happy hour: </b>'+pubs[key].happy_hour+'</p>' +
					'<p class = "entry"><b>Cheapest beer: </b>'+pubs[key].beerprice+'</p>' +					
					'<a href="'+pubs[key].website+'" target="_blank">Website</a></p>' +
					'<p class = "entry"><b>Telephone:</b> '+pubs[key].phone+'</p>' +
					'<p class = "entry"><b>Mail: </b>'+pubs[key].email+'</p>' +
					'<p class = "entry"><b>Food: </b>'+pubs[key].food+'</p>' +
					'<p class = "entry"><b>Barrier free: </b>'+pubs[key].wheelchair+'</p>' +
					eventContent +
					'<img src="pubs/thumb/'+pubs[key].id+'.jpg" style="width:50%;"onerror=this.src="pubs/thumb/0.jpg" /></br>' +
					'<button onclick="moveTo('+pubs[key].lat+','+pubs[key].lng+','+pubs[key].id+');">Move to</button></div>';

				$("#result").append(content).collapsibleset("refresh");
				
			}
		}
		
		function moveTo(lat,lng,id) {
		    map.setView([lat, lng], 20);
			loadPicture(id);
			$("#popup_" + id + "").popup('open');
			$("#leftpanel2").panel("close");
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
		
		//just one event type
		$("#cbConcert").click(function () {
			$("#cbSport").attr("checked",false).checkboxradio("refresh"); 
			$("#cbParty").attr("checked",false).checkboxradio("refresh"); 
		});
		
		$("#cbSport").click(function () {
			$("#cbConcert").attr("checked",false).checkboxradio("refresh"); 
			$("#cbParty").attr("checked",false).checkboxradio("refresh"); 
		});
		
		$("#cbParty").click(function () {
			$("#cbSport").attr("checked",false).checkboxradio("refresh"); 
			$("#cbConcert").attr("checked",false).checkboxradio("refresh"); 
		});