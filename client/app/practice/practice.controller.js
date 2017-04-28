'use strict';

angular.module('eventx')
	.controller('practiceCtrl', function($scope, $timeout, socket, User, Auth) {
		$scope.userInfo = {}
		$scope.newEvent = {};
		$scope.getCurrentUser = Auth.getCurrentUser;

		$scope.getCurrentUser(function(user) {
			$scope.currentUser = user;
			$scope.userInfo.user = $scope.currentUser.name;
			$scope.userInfo.createdDate = new Date();
			//newEventDefaults.creator = $scope.currentUser._id;
		});

		User.getPracticeData().$promise.then(function(response) {
			$scope.practice = response;
			socket.syncUpdates('practices', $scope.practices);
		});

		$scope.$on('$destroy', function() {
			socket.unsyncUpdates("practices");
		});
	});
