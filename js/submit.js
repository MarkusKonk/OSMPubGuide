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
		
		$(xml).find('node').each(function(){
			var id = $(this).attr('id');
			var lat = $(this).attr('lat');
			var lng = $(this).attr('lon');
			var pubName="";
			var type="";
			var website="";
			var phone="";
			var adresscity="";
			var adressnr="";
			var adresscode="";
			var adressstreet="";
			var e_mail="";
			opening_hours="";
			images="";
			
			$(this).find('tag').each(function(){
				var actk = $(this).attr('k');
				//adress
				if (actk == 'addr:city')
				{
					adresscity = $(this).attr('v');
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
				
				//name
				if (actk == 'name')
				{
					pubName = $(this).attr('v');
				}
				
				//type
				if (actk == 'amenity')
				{
					type = $(this).attr('v');
				}
				
				//website
				if (actk == 'website')
				{
					website = $(this).attr('v');
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
				
				//opening hours
				if (actk == 'opening_hours')
				{
					opening_hours = $(this).attr('v');
				}
				
			});
			
			adress=adressstreet+','+adressnr+','+adresscode+','+adresscity;
			//opening_hours="Hallo";
			
			console.log(lat, lng, pubName, id,type)
						
			deleteAllMarkerandPopups();
			addPopup(lat, lng, pubName, id,type, opening_hours, adress, e_mail, phone, website, images); 
			
<<<<<<< HEAD
=======
		//deleteAllMarkerandPopups();
		//addPopup(lat, lng, pubName, id,type, opening_hours, adress, email, phone, website, images) 
>>>>>>> origin/master
		});
	}
});