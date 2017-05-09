'use strict';

(function () {

  class ReferralCtrl {

    constructor($timeout, $rootScope, $state, $filter, socket, ReferralService, Auth) {
      var vm = this;
      this.Referrals = [];
      this.isAdmin = Auth.isAdmin;
      this.ReferralService = ReferralService;
      $rootScope.$state = $state;
      this.getCurrentUser = Auth.getCurrentUser;
      this.defaultMode = 'card'
      this.curPage = 0;
      this.pageSize = 12;
      vm.noRecords=false;


      this.numberOfPages = function () {
        var myFilteredData = $filter('daterange')(vm.Referrals, vm.startDate, vm.endDate)
        if (myFilteredData) {
          return Math.ceil(myFilteredData.length / vm.pageSize);
        } else {
          return Math.ceil(vm.Referrals.length / vm.pageSize);
        }
        //return Math.ceil(vm.Referrals.length / vm.pageSize);
      };

      vm.getCurrentUser(function (user) {
        vm.currentUser = user;
        vm.ReferralStatus = ['Awaiting', 'Cancel', 'Done'];
        // get app the Referrals of logged users - physician/patient
        if (vm.currentUser.role === 'patient') {
          ReferralService.byPatientID.query({
            patientId: vm.currentUser._id
          }).$promise.then(function (response) {
            console.log(response)
            vm.Referrals = response;
            vm.noRecords=response.length===0;
            socket.syncUpdates('Referral', vm.Referrals);
          });
        }
        else if (vm.currentUser.role === 'physician') {
          ReferralService.byDocId.query({
            docId: vm.currentUser._id
          }).$promise.then(function (response) {
            console.log(response)
            vm.Referrals = response;
            socket.syncUpdates('Referral', vm.Referrals);
          });
        }
        else {
          ReferralService.query().$promise.then(function (response) {
            console.log(response)
            vm.Referrals = response;
            socket.syncUpdates('Referral', vm.Referrals);
          });
        }

      });
    }


    clearFilter() {
      this.curPage = 0;
      this.pageSize = 12;
      this.startDate = null;
      this.endDate = null;
    }

    setReferralStatus(app) {

      if (app) {
        delete app.patient;
        delete app.physician;

        this.ReferralService.update({
          id: app._id
        }, app).$promise.then(function () {
          Materialize.toast('Referral updated.', 2000, '', function () { });
        }, function (error) { // error handler
          if (error.data.errors) {
            var err = error.data.errors;
            console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
          } else {
            var msg = error.data.message;
            console.log(msg);
            Materialize.toast(msg, 2000, '', function () { });
          }
        });


      }
      console.log(app);
    }
  }

  angular.module('eventx')
    .controller('ReferralCtrl', ReferralCtrl)
    .filter('UTCToNow', function () {
      return function (input, format) {
        return moment.utc(input).format('dddd, MMMM Do YYYY, h:mmA');
      };
    }).filter('pagination', function () {
      return function (input, start) {
        if (input) {
          start = +start;
          return input.slice(start);
        }
        return [];
      };
    }).filter('daterange', function () {
      return function (items, startDate, endDate) {
        var filteredResult = [];
        // Take action if the filter elements are filled
        if (startDate && endDate) {

          items.forEach(function (item) {

            var appStart = moment(new Date(item.start)).format("MM-DD-YYYY");
            var appEnd = moment(new Date(item.end)).format("MM-DD-YYYY");
            var s = moment(new Date(startDate)).format("MM-DD-YYYY");
            var e = moment(new Date(endDate)).format("MM-DD-YYYY");

            console.log(appStart, s, appEnd, e);
            console.log(appStart >= s);
            console.log(appEnd <= e);
            if (appStart >= s && appEnd <= e) {
              filteredResult.push(item);
            }
          });

        } else {
          return items; // By default, show the regular table data
        }

        return filteredResult;
      }
    });

})();
