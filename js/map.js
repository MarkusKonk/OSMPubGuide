				var lon = 7.6286;
				var lat = 51.9629;
				var zoom = 14;
				var zoomPosition = 'topright';
				var searchPosition = 'topcenter';

				var map = L.map('map', { zoomControl: false }).setView([lat, lon], zoom);
				map.addControl( L.control.zoom({position: zoomPosition}) );
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
				
				L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				}).addTo(map);
				
			  marker=L.marker();
				 
				 marker.setLatLng( [51.9629, 7.6286] );
				$('#mapElements').append("<div data-role='popup' href='popupBasic' id='popupArrow' class='ui-content' data-arrow='true'><p align='center'><a>Gorilla Bar</a></p><table style='border-spacing: 15px 0px'><tr><td valign='top'><b>Opening hours </b> </td><td><table><tr><td>Mon - Thu:</td><td> 20.00 - 02.00</td><tr><td>Fri - Sat:</td><td> 20.00 - 03.00 </td></tr> </table></td></tr><tr><td valign='top'><b>Adress</b></td><td>Juedefelderstr. 54<br>48143 MUENSTER  </td></tr><tr><td valign='top'><b>Phone number</b></td><td>0251-4882188</td></tr><tr><td valign='top'><b>Mail adress</b></td><td>info@gorilla-bar.de</td></tr><tr valign='top'><td><b>Website</b></td><td><a href='http://www.gorilla-bar.de/' style='font-weight:normal'>http://www.gorilla-bar.de/</a>  </td></tr><tr><th  colspan='2' align='left'><a href='http://www.gorilla-bar.de/'>More information</a></th></tr></table><p align='center'><img src='gorilla1.jpg' style = 'height:80px;'/><img src='gorilla2.jpg' style = 'height:80px;'/></p></div>");
               
			   marker.on('click', function(e) {
			   var m=e.target;
			   var x=map.latLngToContainerPoint(m.getLatLng(),zoom).x;
			   var y =map.latLngToContainerPoint(m.getLatLng(),zoom).y;
				var offsetLeft=$('#leftpanel2').width();
				$('#popupArrow').popup( 'open',{x:offsetLeft+x,y:y});
                 });
				marker.addTo(map);
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