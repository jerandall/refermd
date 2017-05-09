'use strict';

describe('Component: PracticeComponent', function () {

  // load the controller's module
  beforeEach(module('eventx'));

  var PracticeComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PracticeComponent = $componentController('PracticeComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
