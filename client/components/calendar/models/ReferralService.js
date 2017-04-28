"use strict";
angular.module('eventx').factory('ReferralsService', function($resource) {

	var referral = {};

	referral = $resource('/api/referrals/:id', null, {
		'update': {
			method: 'PUT'
		},
		query: {
			method: 'GET',
			isArray: true
		}
	});

	referral.byDocId = $resource('/api/referrals/docs/:docId', null, {
		query: {
			method: 'GET',
			params: {
				docId: '@docId'
			},
			isArray: true
		}
	});

referral.byPatientID = $resource('/api/referrals/patients/:patientId', null, {
		query: {
			method: 'GET',
			params: {
				patientId: '@patientId'
			},
			isArray: true
		}
	});
	return referral;
});
