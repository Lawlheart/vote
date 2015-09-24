'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/polls/:pollid', {
        templateUrl: 'app/polls/polls.html',
        controller: 'PollsCtrl'
      });
  });
