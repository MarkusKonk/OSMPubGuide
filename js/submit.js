// get query parameters on click of the submit button and send a request 
// request returns an xml file
$("#submit").click(function (e) {
    //default bounding box
    var bbox = "51.967,7.6,51.95,7.66"
    //get query parameters
    var start = $("#datePickerStart").val();
    var end = $("#datePickerEnd").val();
    var hasFood = $("#cbFood").is(":checked");
    var hasOutdoorSeats = $("#outside").is(":checked");
    var hasHappyHour = $("#happy_hour").is(":checked");
    var isBarrierFree = $("#cbBarrier").is(":checked");

	var maximumBeerPrice = "";
	$('input[name="radio-choice-h-6"]:checked').each(function() {
		maximumBeerPrice = this.value;
	});
	console.log(maximumBeerPrice);


    // get checked event types
    var eventType = "";
    if ($("#cbConcert").is(":checked")) {
        eventType = "concert";
    }
    if (!eventType == "" && $("#cbSport").is(":checked")) {
        eventType = eventType + ",sport";
    } else if ($("#cbSport").is(":checked")) {
        eventType = "sport";
    }
    if (!eventType == "" && $("#cbParty").is(":checked")) {
        eventType = eventType + ",party";
    } else if ($("#cbParty").is(":checked")) {
        eventType = "party";
    }


    // if end time is empty, endtime = starttime + 24h
    if (end == "") {
        var temp = new Date(start);
        temp.setHours(parseInt(temp.getHours()) + 24);
        var month = "";
        var minutes = "";
        if ((parseInt(temp.getMonth()) + 1) < 10) month = "0" + parseInt(temp.getMonth() + 1);
        else month = parseInt(temp.getMonth() + 1);
        if ((parseInt(temp.getMinutes())) < 10) minutes = "0" + parseInt(temp.getMinutes());
        else minutes = parseInt(temp.getMinutes());
        end = temp.getFullYear() + "-" + month + "-" + temp.getDate() + "T" + temp.getHours() + ":" + minutes;
    }

    // default query string
    var query = "http://giv-openpubguide.uni-muenster.de:8080/de.ifgi.ohbpgiosm/rest/pubs/query?bbox=" + bbox + "&start=" + start + "&end=" + end;

    //add events 
    if (!eventType == "") {
        query = query + "&eventFilter=eventType=" + eventType;
    }

    // array containing BOOLEAN filter parameters
    var filter = new Array();
    filter["hasFood"] = hasFood;
    filter["hasOutdoorSeats"] = hasOutdoorSeats;
    filter["hasHappyHour"] = hasHappyHour;
    filter["isBarrierFree"] = isBarrierFree;

    // adding boolean query parameters and beer price to the query
    if (filter.length > 0 || !maximumBeerPrice == "") {
        query = query + "&filter=";
        for (var key in filter) {
            if (filter[key] == true) {
                query = query + key + ",";
            }
        }
        if (!maximumBeerPrice == "") query = query + "maximumBeerPrice=" + maximumBeerPrice;
        else query.slice(0, -1); //remove unnecessary comma at the end
    }

    console.log(query); //just for testing
	ajaxrequest(query);
    
	});
	
	function ajaxrequest(query)
	{// request using jQuery
		console.log(query); //just for testing
		$.ajax({
			type: "GET",
			url: query,
			dataType: "xml",
			success: parseXML
			//function (data) {
				//console.log("Successfully queried API!");
				//console.log(data);
			
			
			//},

			//error: function (data) {
			//   console.log("An error occurred while processing XML file.");
       // }
    });
	}
	
	
	function parseXML(xml)
	{		 	
		//	The following array will contain all pubs, each entry is an object of type newPub.
		var allpubs = new Array();
		var allevents = new Array();
		
		deleteAllMarkerandPopups();
		
		//pubs
		$(xml).find('node').each(function(){
			var id = $(this).attr('id');
			var lat = $(this).attr('lat');
			var lng = $(this).attr('lon');
			var pubName="";
			var type="";
			var food="";
			var website="";
			var wheelchair="";
			var phone="";
			var adresscity="";
			var adresscountry="";
			var adressnr="";
			var adresscode="";
			var adressstreet="";
			var email="";
			var opening_hours="";
			var images="";
			var beerprice="";
			var outdoor_seatings="";
			var happy_hour="";
			var tuc="";
			
			$(this).find('tag').each(function(){
				var actk = $(this).attr('k');
				//adress
				if (actk == 'addr:city')
				{
					adresscity = $(this).attr('v');
				}
				
				if (actk == 'addr:country')
				{
					adresscountry = $(this).attr('v');
				}
				
				if (actk == 'addr:housenumber')
				{
					adressnr = $(this).attr('v');
				}
				
				if (actk == 'addr:postcode')
				{
					adresscode = $(this).attr('v');
				}
				
				if (actk == 'addr:street')
				{
					adressstreet = $(this).attr('v');
				}
				
				//type
				if (actk == 'amenity')
				{
					type = $(this).attr('v');
				}
				
				//food
				if (actk == 'food')
				{
					food = $(this).attr('v');
				}
				
				//name
				if (actk == 'name')
				{
					pubName = $(this).attr('v');
				}
								
				//website
				if (actk == 'website')
				{
					website = $(this).attr('v');
				}
				
				//wheelchair
				if (actk == 'wheelchair')
				{
					wheelchair = $(this).attr('v');
				}
				
				//email
				if (actk == 'contact:email')
				{
					email = $(this).attr('v');
				}
				
				//phone
				if (actk == 'contact:phone')
				{
					phone = $(this).attr('v');
				}
				
				//beerprice
				if (actk == 'price:beer')
				{
					beerprice = $(this).attr('v');
				}
				
				//outdoor_seatings
				if ((actk == 'outdoor_seatings') || (actk == 'beer_garden'))
				{
					outdoor_seatings = $(this).attr('v');
				}
				
				//opening hours
				if (actk == 'opening_hours')
				{
					opening_hours = $(this).attr('v');
				}
				
				//happy_hour
				if (actk == 'happy_hour')
				{
					happy_hour = $(this).attr('v');
				}
				
				//Time until closing
				if (actk == 'tuc')
				{
					tuc = $(this).attr('v');
				}
				
				
			});
			
			adress=adressstreet+','+adressnr;
						
			//console.log(lat, lng, pubName, id,type, adress, food, wheelchair, beerprice, outdoor_seatings, opening_hours, happy_hour, tuc)
						
			addPopup(lat, lng, pubName, id,type, opening_hours, adress, email, phone, website, images); 
			
			//has to be filled with all attributes.
			var pub = new newPub(id, lat, lng, pubName, type, adressstreet, adressnr, adresscode, adresscity, adresscountry, email, phone, website, food, wheelchair, beerprice, outdoor_seatings, opening_hours, happy_hour, tuc);
			allpubs.push(pub);
			//console.log(allpubs);
			
		});
		
		//function does not exist, will be defined later by Markus
		createResultList(allpubs);
		
		//events
		$(xml).find('event').each(function(){
			var ev_id = $(this).attr('id');
			var ev_start = $(this).attr('start');
			var ev_end = $(this).attr('end');
			
			var ev_name="";
			var ev_type="";
			var ev_description="";
			var ev_cost="";
			
			$(this).find('tag').each(function(){
				
				//event name
				if (actk == 'name')
				{
					ev_name = $(this).attr('v');
				}
				
				//event type
				if (actk == 'type')
				{
					ev_type = $(this).attr('v');
				}
				
				//event description
				if (actk == 'description')
				{
					ev_description = $(this).attr('v');
				}
				
				//event cost
				if (actk == 'cost')
				{
					ev_cost = $(this).attr('v');
				}
				
			});	
			
			//has to be filled with all attributes.
			var event = new newEvent(ev_id, ev_start, ev_end, ev_name, ev_type, ev_description, ev_cost);
			allevents.push(event);
			
		}); //end events
		
		//relations
		$(xml).find('relation').each(function(){
			$(this).find('member').each(function(){
				//node
				if (acttype == 'node')
				{
					nodeid = $(this).attr('ref');
				}
				
				//event
				if (acttype == 'event')
				{
					eventid = $(this).attr('ref');
				}
			});
			
			//for number of objects in event do: check if the current eventid is eventid then insert pubid, else go to the next
			for (i=0; allevents.length; i++){
				if (eventid == allevents[i].id)
				{
					allevents[i].pubid = nodeid;
				}
			}
		});
	}

function newPub(id, lat, lng, pubName, type, adressstreet, adressnr, adresscode, adresscity, adresscountry, email, phone, website, food, wheelchair, beerprice, outdoor_seatings, opening_hours, happy_hour, tuc){
	this.id = id;
	this.lat = lat;
	this.lng = lng;
	this.pubname = pubName;
	this.type = type;
	this.street = adressstreet;
	this.housenr = adressnr;
	this.city = adresscity;
	this.country = adresscountry;
	this.email = email;
	this.phone = phone;
	this.website = website;
	this.food = food;
	this.wheelchair = wheelchair;
	this.beerprice = beerprice;
	this.opening_hours = opening_hours;
	this.happy_hour = happy_hour;
	this.tuc = tuc;
}

function newEvent(ev_id, ev_start, ev_end, ev_name, ev_type, ev_description, ev_cost){
	this.idpub="";
	this.id = ev_id;
	this.start = ev_start;
	this.end = ev_end;
	this.name = ev_name;
	this.type = ev_type;
	this.description = ev_description;
	this.cost = ev_cost;
}