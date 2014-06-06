				var lon = 7.6286;
				var lat = 51.9629;
				var zoom = 14;
				var zoomPosition = 'topright';
				var searchPosition = 'topcenter';

				var map = L.map('map', { zoomControl: false }).setView([lat, lon], zoom);
				map.addControl( L.control.zoom({position: zoomPosition}) );
				
				L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				}).addTo(map);
				
			  //Popup
				 function addPopup(lat,lng,pubName,id,opening_hours,adress,e_mail,phone,website,images)
				 {
				 var marker=L.marker();
				 marker.setLatLng( [lat, lng] );
				 //adress
				 var adresses=adress.split(',');
				 var adress="";
				 for(var p in adresses){
				 adress=adress+adresses[p]+"<br>";
				 }
				 //opening hours
				var opening=opening_hours.split(',');
				var openingHours="<table>";
				 for(var i=0;i<opening.length;i++){
				 var openArray=opening[i].split(":");
                  openingHours =openingHours+ "<tr><td>"+openArray[0]+":</td>";
				  openingHours = openingHours+"<td>"+openArray[1]+"</td></tr>";
				 }
				 openingHours=openingHours+" </table>";
				 //images
				 var pictures=images.split(',');
				 var images="";
				 for(var i=0;i<pictures.length;i++){
				 images=images+"<img src="+pictures[i]+" style = 'height:80px;'/>";
				 }
				 //create popup element
				$('#mapElements').append("<div data-role='popup' id='"+id+"' class='ui-content ' data-arrow='true'><a data-rel='back' data-role='button' data-theme='a' data-icon='delete' data-iconpos='notext' class='ui-btn-right'/><p align='center'><a>"+pubName+"</a></p><table style='border-spacing: 15px 0px'><tr><td valign='top'><b>Opening hours </b> </td><td>"+openingHours+"</td></tr><tr><td valign='top'><b>Adress</b></td><td>"+adress+" </td></tr><tr><td valign='top'><b>Phone number</b></td><td>"+phone+"</td></tr><tr><td valign='top'><b>Mail adress</b></td><td>"+e_mail+"</td></tr><tr valign='top'><td><b>Website</b></td><td><a href='"+website+"' style='font-weight:normal'>"+website+"</a>  </td></tr><tr><th  colspan='2' align='left'><a href='http://www.gorilla-bar.de/'>More information</a></th></tr></table><p align='center'>"+images+"</p></div>");
                // bind popup to marker
			     marker.on('click', function(e) {
			    var m=e.target;
			     var x=map.latLngToContainerPoint(m.getLatLng(),zoom).x;
			     var y =map.latLngToContainerPoint(m.getLatLng(),zoom).y;
				var offsetLeft=$('#leftpanel2').width();
				$("#"+id+"").popup( 'open',{x:offsetLeft+x,y:y});
                 });
				marker.addTo(map);
				}
				//add dynamically popup
				addPopup(51.9629, 7.6286,'Gorilla Bar',"GorillaBar","Mon - Thu: 20.00 - 02.00,Fri - Sat: 20.00 - 03.00",'Juedefelderstr. 54,48143 MUENSTER','info@gorilla-bar.de','0251-4882188','http://www.gorilla-bar.de/',"gorilla1.jpg,gorilla2.jpg");
				addPopup(51.961, 7.65,'Cavete',"Cavete","Mon - Thu: 20.00 - 02.00,Fri - Sat: 20.00 - 03.00",'Juedefelderstr. 54,48143 MUENSTER','info@gorilla-bar.de','0251-4882188','http://www.gorilla-bar.de/',"gorilla1.jpg,gorilla2.jpg");

				//Popup end
				var popup = L.popup();
				
				function onMapClick(e) {
							popup
								.setLatLng(e.latlng)
								.setContent("You clicked the map at " + e.latlng.toString())
								.openOn(map);
				}

				map.on('click', onMapClick);
				
				//Leaflet Plugin: Search Bar (Provider: OpenStreetMap)
				new L.Control.GeoSearch({
				provider: new L.GeoSearch.Provider.OpenStreetMap(),
				position: searchPosition,
				showMarker: false
				}).addTo(map);
				
				//The function for determine user's current location with a marker and a circle
				function CurrentLocation()
				{
					map.locate({setView: true, watch: true})
				
						function onLocationFound(e) {
						var radius = e.accuracy / 2;

						L.marker(e.latlng).addTo(map);
						L.circle(e.latlng, radius).addTo(map);
				}

					map.on('locationfound', onLocationFound);
				
						function onLocationError(e) {
						alert(e.message);
						}

						map.on('locationerror', onLocationError);
				}
				
