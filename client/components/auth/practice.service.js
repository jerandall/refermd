'use strict';

(function() {

	function PracticeResource($resource) {
		return $resource('/api/practices/:id/:controller', {
			id: '@_id'
		}, {
			getPractices: {
				method: 'GET',
				isArray: true
			},

		});
	}

	angular.module('eventx.auth')
		.factory('Practice', PracticeResource);

})();
