//get query parameters on click of the submit button and send request 
$(document).on("click", "#submit", function(e){
var date = $("#date").val();
var time = $("#time-1").val();
var food = $("#checkbox-v-2a").val();

var query = "http://giv-openpubguide.uni-muenster.de:8080/de.ifgi.ohbpgiosm/rest/pubs/getpubswithinbbox"
alert(date +","+ time +","+ food); //just for testing


// request using XMLHttpRequest
var xmlHttp = null;
try {
    // Mozilla, Opera, Safari and Internet Explorer (v7)
    xmlHttp = new XMLHttpRequest();
} catch(e) {
    try {
        // MS Internet Explorer (v6)
        xmlHttp  = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(e) {
        try {
            // MS Internet Explorer (v5)
            xmlHttp  = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            xmlHttp  = null;
        }
    }
}
if (xmlHttp) {
    xmlHttp.open('GET', query, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            alert(xmlHttp.responseText); //just for testing
        }
    };
    xmlHttp.send(null);
}

});