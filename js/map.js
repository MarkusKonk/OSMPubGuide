				var lon = 7.6286;
				var lat = 51.9629;
				var zoom = 14;
				var zoomPosition = 'topright';
				var searchPosition = 'topcenter';

				var map = L.map('map', { zoomControl: false }).setView([lat, lon], zoom);
				map.addControl( L.control.zoom({position: zoomPosition}) )
				
				
				L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				}).addTo(map);
				
				L.marker([51.9629, 7.6286]).addTo(map)
				.bindPopup("Name</b><br />Opening hours</b><br />Adress</b><br />Website</b><br /><a href='#'>Link for more information</></b><br /><img src='gorilla.jpg' style = 'height:50px;'/>");

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