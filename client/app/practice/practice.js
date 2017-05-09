'use strict';

angular.module('eventx')
	.config(function($stateProvider) {
		$stateProvider
			.state('practice', {
				url: '/practice',
				templateUrl: 'app/practice/practice.html',
				controller: 'PracticeCtrl'
			});
	});
