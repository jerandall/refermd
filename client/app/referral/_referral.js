'use strict';

angular.module('eventx')
  .config(function ($stateProvider) {
    $stateProvider
      .state('referral', {
        url: '/referral',
        templateUrl: 'app/referral/referral.html',
        controller: 'ReferralCtrl',
        controllerAs: 'app',
        authenticate: true
      });
  });
