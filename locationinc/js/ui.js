
var _currentState;

(function() {
	$.getJSON('http://locationinc-mapping-demo.herokuapp.com/states.json?callback=?', function(data){
		states(data);
	});
}());

function states(data) {
	var _states;
	if (!data) { return }
	_states = data;
	fillStates(_states);
}

function fillStates(states) {
	var stateCode;
	for (var i = 0; i < states.length; i++) {
		$("#states").append('<option value="' + states[i].code + '">' + states[i].name + '</option>');
	};

	// get initial stateCode
	$("#states option").each(function(i,e){
     	if ($(this).is(':selected')){
     		stateCode = $(this).val();
     		_currentState = $(this).text();
    		return false;
  		}
     });

	getCities(stateCode);
}

function getCities(stateCode) {
	$.getJSON('http://locationinc-mapping-demo.herokuapp.com/' + stateCode + '/cities.json?callback=?', function(data){
		cities(data);
	});
}

function cities(data) {
	var _cities;
	if (!data) { return }
	_cities = data;
	fillCities(_cities);
}

function fillCities(cities) {
	$("#cities").empty();
	for (var i = 0; i < cities.length; i++) {
		$("#cities").append('<option id=city_' + i + '>' + cities[i].name + '</option>');
		$("#city_" + i).data('city',cities[i]);
	};
}

function setInfo(city) {
	$("#stateName").html('<strong>State:</strong> ' + _currentState);
	$("#cityName").html('<strong>City:</strong> ' + city.name);
	$("#lat").html('<strong>Latitude:</strong> ' + city.lat);
	$("#lng").html('<strong>Longitude:</strong> ' + city.lng);

}

// init Google Map API
function initialize(lat,lng) {
	var latlng = new google.maps.LatLng(lat,lng);
	var mapOptions = {
		center: { lat: lat, lng: lng },
		zoom: 10
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		title: 'Hello World!'
	});

	// Resize stuff...
	google.maps.event.addDomListener(window, "resize", function() {
		console.log('resize')
   		var center = map.getCenter();
   		google.maps.event.trigger(map, "resize");
   		map.setCenter(center); 
	});
}


