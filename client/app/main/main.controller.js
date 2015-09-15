'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $scope.awesomeThings.push({ name: $scope.newThing });
      $http.post('/api/things', { name: $scope.newThing }).success(function(thatThingWeJustAdded) {
        $scope.awesomeThings.pop(); // let's lose that id-lacking newThing 
        $scope.awesomeThings.push(thatThingWeJustAdded); // and add the id-having newThing!
        $scope.newThing = '';
      });
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
