'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/newpoll', {
        templateUrl: 'app/newpoll/newpoll.html',
        controller: 'NewpollCtrl',
        authenticate: true 
      });
  });
