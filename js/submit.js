// get query parameters on click of the submit button and send a request 
// request returns an xml file
$("#submit").click(function (e) {
    //default bounding box
    var bbox = "41.886288445510516,12.483901977539062,41.893700240146295,12.500102519989014"
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

    // request using jQuery
    $.ajax({
        type: "GET",
        url: "http://giv-openpubguide.uni-muenster.de:8080/de.ifgi.ohbpgiosm/rest/pubs/getpubswithinbbox?south=41.886288445510516&west=12.483901977539062&north=41.893700240146295&east=12.500102519989014",
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
	
	function parseXML(xml)
	{		 	
		//	The following array will contain all pubs, each entry is an object of type newPub.
		//	var allEntries = new Array();
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
			var e_mail="";
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
				if (actk == 'email')
				{
					e_mail = $(this).attr('v');
				}
				
				//phone
				if (actk == 'phone')
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
			
			adress=adressstreet+','+adressnr+','+adresscode+','+adresscity+','+adresscountry;
						
			console.log(lat, lng, pubName, id,type, adress, food, wheelchair, beerprice, outdoor_seatings, opening_hours, happy_hour, tuc)
						
			deleteAllMarkerandPopups();
			addPopup(lat, lng, pubName, id,type, opening_hours, adress, e_mail, phone, website, images); 
			
			//has to be filled with all attributes.
			var pub = new newPub(pubname,mail,phone);
			allEntries.push(pub);
			
		});
		
		//function does not exist, will be defined later by Markus
		//insertResults(allEntries);
		
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
		});
	}
});

function newPub(pubname,email,phone){
	this.pubname = pubname;
	this.email = email;
	this.phone = phone;
}