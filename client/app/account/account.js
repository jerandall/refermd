'use strict';

angular.module('eventx')
	.config(function($stateProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/account/login/login.html',
				controller: 'LoginController',
				controllerAs: 'vm'
			})
			.state('logout', {
				url: '/logout?referrer',
				referrer: 'login',
				template: '',
				controller: function($state, Auth) {
					var referrer = $state.params.referrer ||
						$state.current.referrer ||
						'login';
						console.log(referrer);
					Auth.logout();
					$state.go(referrer);
				}
			})
			.state('signup', {
				url: '/signup',
				templateUrl: 'app/account/signup/signup.html',
				controller: 'SignupController',
				controllerAs: 'vm'
			})
			.state('settings', {
				url: '/settings',
				templateUrl: 'app/account/settings/settings.html',
				controller: 'SettingsController',
				controllerAs: 'vm',
				authenticate: true
			})
			.state('addreferral', {
				url: '/addreferral',
				templateUrl: 'app/addreferral/addreferral.html',
				controller: 'AddReferralController',
				controllerAs: 'vm',
				authenticate: true
			})
			.state('shifts', {
				url: '/shifts',
				templateUrl: 'app/account/shifts/shifts.html',
				controller: 'ShiftsController',
				controllerAs: 'vm',
				authenticate: 'physician'
			})
			.state('holidays', {
				url: '/holidays',
				templateUrl: 'app/account/holiday/holidays.html',
				controller: 'HolidaysController',
				controllerAs: 'vm',
				authenticate: 'physician'
			})

			.state('forget', {
				url: '/forget',
				templateUrl: 'app/account/forget/forget.html',
				controller: 'ForgetCtrl',
				controllerAs: 'vm',
			})
			.state('reset', {
				url: '/reset/:token',
				templateUrl: 'app/account/reset/reset.html',
				controller: 'ResetCtrl',
				controllerAs: 'vm',
			});
	})
	.run(function($rootScope) {
		$rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
			if (next.name === 'logout' && current && current.name && !current.authenticate) {
				next.referrer = current.name;
			}
		});
	});
