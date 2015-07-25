$(function() {
	$('[data-toggle="tooltip"]').tooltip({
		container: 'body'
	});
	var previousScroll = 0;
	$(window).scroll(function(){
		var currentScroll = $(this).scrollTop();
		if (currentScroll > 70) {
			if (currentScroll > previousScroll) {
				$('#main-nav').addClass('asleep');
			} else {
				$('#main-nav').removeClass('asleep');
			}
		} else {
			$('#main-nav').removeClass('asleep');
		}
		previousScroll = currentScroll;
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

timeline.directive('experiences', function() {
	return {
		restrict: 'E',
		transclude: true,
		controller: function($scope) {
			this.types = $scope.types = [];

			this.addType = function(type) {
				$scope.types.push(type);
			};

			this.visible = function(type) {
				var anySelected = _.reduce($scope.types, function(acc, t){
					return acc || t.checked;
				}, false);
				if (!anySelected) return true;
				return _.result(_.find($scope.types, function(t){
					return t.type === type.type;
				}), 'checked');
			};
		},
		controllerAs: 'exps',
		template: '<section class="section resume" id="resume" ng-transclude></section>'
	};
});

timeline.directive('experienceType', [function() {
	return {
		require: '^experiences',
		scope: {
			type: "="
		},
		link: function(scope, element, attrs, ctrl) {
			ctrl.addType(scope.type);
		},
		template: 
			'<div class="col-md-4 text-center">' +
			'<label>' +
			'<div class="col-xs-2 col-middle-alt">' +
			'<input type="checkbox" ng-model="type.checked">' + 
			'</div>' +
			'<div class="col-xs-7 col-middle-alt">' + 
			'<i class="glyphicon {{type.icon}}" ></i>' +
			'<div>{{type.label}}</div>' + 
			'</div>' +
			'</label>' +
			'</div>'
	};
}]);

timeline.directive('event', [function() {
	return {
		require: '^experiences',
		scope: {
			type: "@"
		},
		transclude: true, 
		link: function(scope, element, attrs, ctrl) {
			scope.visible = ctrl.visible;
		},
		template: '<li class="event animate-show" ng-show="visible({type: type})" ng-transclude></li>',
		replace: true
	};
}]);
