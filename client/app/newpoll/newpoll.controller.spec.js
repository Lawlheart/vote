'use strict';

describe('Controller: NewpollCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var NewpollCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewpollCtrl = $controller('NewpollCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
