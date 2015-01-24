$(function() {
	$('[data-toggle="tooltip"]').tooltip({
		container: 'body'
	});
});

var gmaps = {
	map: null,
	geocoder: null,
	me: null,

	initialize: function() {
		gmaps.me = new google.maps.LatLng(45.5030792, 9.1766231);

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

var timeline = angular.module('timeline', ['ngAnimate']);

timeline.directive('experiencesSelector', [function() {
	return {
		transclude: true,
		scope: {},
		controller: function($scope, $element) {
			var types = $scope.types = [];

			$scope.checked = function(type) {
				type.checked = true;
			};

			this.addType = function(type) {
				types.push(type);
			};
		},
		template: 
			'<div class="row experience-selector">' +
				'<div class="col-md-4 text-center" ng-repeat="type in types">' +
					'<label>' +
						'<div class="col-xs-2 col-middle-alt">' +
							'<input type="checkbox" ng-click="checked(type)">' + 
						'</div>' +
						'<div class="col-xs-7 col-middle-alt">' + 
							'<i class="glyphicon {{type.icon}}" ></i>' +
							'<div>{{type.label}}</div>' + 
						'</div>' +
					'</label>' +
				'</div>' +
				'<ng-transclude></ng-transclude>' +
			'</div>',
		replace: true
	};
}]);

timeline.directive('experienceType', [function() {
	return {
		require: '^experiencesSelector',
		scope: {
			label: '@',
			icon: '@'
		},
		link: function(scope, element, attrs, experiencesSelectorCtrl) {
			experiencesSelectorCtrl.addType(scope);
		},
		replace: true
	};
}]);
