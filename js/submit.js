// get query parameters on click of the submit button and send a request 
// request returns an xml file
$("#submit").click(function (e) {
	//remove focus in bottom bar
	$(".ui-btn-active").removeClass('ui-btn-active');
	
	//default bounding box
    var bbox = getBbox();
    console.log("bbox submit: ",bbox);
	if (bbox!="51.95,7.6,51.967,7.66")
		areaSelect.remove(map);
		b_box=false;
    //get query parameters
    var start = $("#datePickerStart").val();
	if (start=="")
	{
		$("#datePickerStart").val(getnow());
		var start = $("#datePickerStart").val();
	}
    var end = $("#datePickerEnd").val();
    var hasFood = $("#cbFood").is(":checked");
    var hasOutdoorSeats = $("#outside").is(":checked");
    var hasHappyHour = $("#happy_hour").is(":checked");
    var isBarrierFree = $("#cbBarrier").is(":checked");

	var maximumBeerPrice = "";
	$('input[name="radio-choice-h-6"]:checked').each(function() {
		maximumBeerPrice = this.value;
	});
	
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


    // if end time is empty, endtime = starttime + 6hh
    if (end == "") {
        var temp = new Date(start);
        temp.setHours(parseInt(temp.getHours()) + 12);
        var month = "";
        var minutes = "";
        if ((parseInt(temp.getMonth()) + 1) < 10) month = "0" + parseInt(temp.getMonth() + 1);
        else month = parseInt(temp.getMonth() + 1);
        if ((parseInt(temp.getMinutes())) < 10) minutes = "0" + parseInt(temp.getMinutes());
        else minutes = parseInt(temp.getMinutes());
        end = temp.getFullYear() + "-" + month + "-" + temp.getDate() + "T" + temp.getHours() + ":" + minutes;
    }
    //change datetime format for desktop version
	var appname = navigator.userAgent.toLowerCase();
		if(appname.search("mobile")==-1){
		end=end.replace(/\//g,"-");
		start=start.replace(/\//g,"-");
		start=start.substr(0, 10) + "T" + start.substr(11);
		end=end.substr(0, 10) + "T" + end.substr(11);
		}
		start=start.replace("Z","");
		end=end.replace("Z","");
		
    // default query string
    var query = "http://giv-openpubguide.uni-muenster.de:8080/OSMPubGuide-WS/tosm/query?bbox=" + bbox + "&start=" + start +":00" + "&end=" + end +":00";

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
        
		var count = 0
        for (var key in filter) {
            if (filter[key] == true) {
				if (count==0)
				{
					query = query + "&filter="+key;
				}
				if (count>0)
				{
					query = query + "," + key;
				}
                
				count = count+1;
            }
        }
        if (!maximumBeerPrice == "" && count>0) query = query + ",maximumBeerPrice=" + maximumBeerPrice;
		else if (!maximumBeerPrice == "" && count==0) query = query + "maximumBeerPrice=" + maximumBeerPrice;
	ajaxrequest(query);
    
	});
	
	function ajaxrequest(query)
	{// request using jQuery
		//console.log(query); //just for testing
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
		var allpubs = {};
		var allevents = new Array();
		
		deleteAllMarkerandPopups();
		var count = false;
		
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
			var beerprice="";
			var outdoor_seatings="";
			var happy_hour="";
			var tuc="";
			count = true;
			
			$(this).find('tag').each(function(){
				var actk = $(this).attr('k');
				
				switch(actk){
					case "addr:city": adresscity = $(this).attr('v'); break;
					case "addr:country": adresscountry = $(this).attr('v'); break;
					case "addr:housenumber": adressnr = $(this).attr('v'); break;
					case "addr:postcode": adresscode = $(this).attr('v'); break;
					case "addr:street": adressstreet = $(this).attr('v'); break;
					case "amenity": type = $(this).attr('v'); break;
					case "food": food = $(this).attr('v'); break;
					case "name": pubName = $(this).attr('v'); break;
					case "website": website = $(this).attr('v'); break;
					case "wheelchair": wheelchair = $(this).attr('v'); break;
					case "email": email = $(this).attr('v'); break;
					case "contact:email": email = $(this).attr('v'); break;
					case "phone": phone = $(this).attr('v'); break;
					case "contact:phone": phone = $(this).attr('v'); break;
					case "price:beer": beerprice = $(this).attr('v'); break;
					case "outdoor_seatings" : outdoor_seatings = $(this).attr('v'); break;
					case "beer_garden" : outdoor_seatings = $(this).attr('v'); break;
					case "opening_hours" : opening_hours = $(this).attr('v'); break;
					case "happy_hour" : happy_hour = $(this).attr('v'); break;
					case "tuc" : tuc = $(this).attr('v'); break;
				}
				
				
			});
			
			adress=adressstreet+','+adressnr;
						
			//console.log(lat, lng, pubName, id,type, adress, food, wheelchair, beerprice, outdoor_seatings, opening_hours, happy_hour, tuc)
						
			addPopup(lat, lng, pubName, id,type, opening_hours, adress, email, phone, website, tuc); 
			
			//has to be filled with all attributes.
			var pub = new newPub(id, lat, lng, pubName, type, adressstreet, adressnr, adresscode, adresscity, adresscountry, email, phone, website, food, wheelchair, beerprice, outdoor_seatings, opening_hours, happy_hour, tuc);
			
			allpubs[""+id+""] = pub;
//			console.log(id);
		});
				
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
			var actk = $(this).attr('k');
			
				switch(actk){
				case "name" : ev_name = $(this).attr('v'); break;
				case "type" : ev_type = $(this).attr('v'); break;
				case "description" : ev_description = $(this).attr('v'); break;
				case "cost" : ev_cost = $(this).attr('v'); break;
				
				}
				
			});	
			
			//has to be filled with all attributes.
			var event = new newEvent(ev_id, ev_start, ev_end, ev_name, ev_type, ev_description, ev_cost);
			allevents.push(event);
			//console.log(allevents);
			
		}); //end events
		
		//relations
		
		$(xml).find('relation').each(function(){
			$(this).find('member').each(function(){
				var acttype = $(this).attr('type');
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
			for (var i=0; i<=allevents.length-1; i++){
				
				if (eventid == allevents[i].id)
				{
					allevents[i].idpub = nodeid;
					if (allpubs.length < 1 ){
					allpubs[""+nodeid+""].events.push(allevents[i]);}
				}
			}
		});
		console.log(allpubs);
		createResultList(allpubs);
		if (count==false)
		{
			window.alert("No results found for your query!");
		}
		putPopupsOnMap();
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
	this.events = [];
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

function getBbox() {
	var bbox;
	if (b_box) {
		   bbox = areaSelect.getBounds()._southWest.lat + "," + areaSelect.getBounds()._southWest.lng + "," + areaSelect.getBounds()._northEast.lat + "," + areaSelect.getBounds()._northEast.lng;
	}
	else {
		bbox = "51.95,7.6,51.967,7.66"
	}
	return bbox;
}