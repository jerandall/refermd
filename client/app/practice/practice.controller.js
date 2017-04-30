'use strict';
(function () {

  class PracticeComponent {
    constructor($scope, $timeout, socket, User, Practice, Auth) {
      $scope.message = 'Hello';

      $scope.userInfo = {}
      $scope.getCurrentUser = Auth.getCurrentUser;

      $scope.getCurrentUser(function (user) {
        $scope.currentUser = user;
        $scope.userInfo.user = $scope.currentUser.name;
        $scope.userInfo.createdDate = new Date();
      });

      Practice.getPractices().$promise.then(function (response) {
        $scope.practices = response;
        console.log($scope.practices);
        socket.syncUpdates('user', $scope.practices);
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates("user");
      });

      $scope.exportCSV = function () {
				var dataToExport = [];
				var dataX = [];
				var columns = [
					'first_name',
					'last_name',
					'email',
					'gender',
					'mobile'

				];
				dataToExport.push(columns);
				angular.copy($scope.practices, dataX)

				for (var index in dataX) {

					var newData = {};
					for (var key in columns) {
						newData[columns[key]] = dataX[index][columns[key]];
					}
					dataToExport.push(_.values(newData))
				}

				var d = new Date();
				var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
				var exportURL = '/api/export/practices' + datestring;
				angular.element('#frmSubmit').attr('action', exportURL);
				angular.element('#data').val(JSON.stringify(dataToExport));
				angular.element('#frmSubmit').submit();
			}

    }
  }

  angular.module('eventx')
    .controller('PracticeComponent', PracticeComponent);
})();
