'use strict';

(function() {

class AdminController {
  constructor(User, ReferralService, Auth,socket) {
    var vm = this;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.referrals = [];
    vm.user = vm.getCurrentUser();
    console.log(vm.getCurrentUser())
    ReferralService.byDocId.query({
      docId: vm.getCurrentUser()._id
    }).$promise.then(function(response) {
      vm.referrals = response;
      socket.syncUpdates('referral', vm.referrals);
    });

  }

  delete(user) {
    user.$remove();
    //this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('eventx.admin')
  .controller('AdminController', AdminController);

})();
