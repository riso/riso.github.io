$(function() {
	$('[data-toggle="tooltip"]').tooltip({container:'body'});
});

var gmaps = {
	map: null,
	geocoder: null,
	me: null,

	initialize: function() {
		gmaps.me = new google.maps.LatLng(45.5030792,9.1766231);

		var mapOptions = {
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: gmaps.me,
		};

		gmaps.geocoder = new google.maps.Geocoder();

		gmaps.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); 
		var marker = new google.maps.Marker({
			position: gmaps.me,
			map: gmaps.map
		});
	}
};

google.maps.event.addDomListener(window, 'load', gmaps.initialize);

var resume = angular.module('resume', ['ngAnimate']);
