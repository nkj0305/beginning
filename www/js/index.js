document.addEventListener('deviceready', onDeviceReady, false);
var geocoder = '';
var cityName = '';
function onDeviceReady() {
    initialize();
    function disp(pos) {
        $('.lat-view').html(pos.coords.latitude);
        $('.long-view').html(pos.coords.longitude);
       // $('.alt-view').html(pos.coords.altitude);

    }

    $('#getIt').click(function () {
        navigator.geolocation.getCurrentPosition(disp);
        navigator.geolocation.getCurrentPosition(locality, onError);
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });
}



function errorFunction() {
    alert("Geocoder failed");
}


function initialize() {
    geocoder = new google.maps.Geocoder();

}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({latLng: latlng}, function(results, status) {
        var itemLocality = '';
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                var arrAddress = results;
                console.log(results);
                $.each(arrAddress, function(i, address_component) {
                    if (address_component.types[0] == "locality") {
                        console.log("City: " + address_component.address_components[0].long_name);
                        itemLocality = address_component.address_components[0].long_name;
                        $('.locality-view').html(itemLocality);
                    }
                });
            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }

    });

}

var locality = function(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng);
}

//GEOLOCATION
var onSuccess = function(position) {
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    //MAP
    var mapOptions = {
        center: new google.maps.LatLng(myLat, myLong),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(myLat, myLong),
        map: map,
        title:"Hello World!"
    });

};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}




