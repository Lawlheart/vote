'use strict';

angular.module('workspaceApp')
  .controller('NewpollCtrl', function ($scope, $http, Auth) {
    $scope.name = "";
    $scope.description = "";
    $scope.message = 'Hello';
    $scope.user = Auth.getCurrentUser();
    $scope.loggedIn = Auth.isLoggedIn();
    console.log($scope.user, $scope.loggedIn)
    $scope.choices = [{
    	choice: "",
      votes: 0
    }, {
    	choice: "",
      votes: 0
    }, {
    	choice: "",
      votes: 0
    }];
    $scope.pollTest = {
        name: $scope.name,
        info: $scope.description,
        choices: $scope.choices,
        active: true,
        user: $scope.user.name
      }
    $scope.addChoice = function() {

    	var num = $scope.choices.length;
    	$scope.choices.push({
    		choice: "",
        votes:0
    	})
    }
    $scope.newPoll = function() {
      if($scope.loggedIn) {
        var user = $scope.user.name;
      } else {
        alert("Please sign in");
        return
      }
      if( !$scope.choices[0].choice || !$scope.choices[1].choice) {
        alert("Please enter at least 2 choices");
      }
      var poll = {
        name: $scope.name,
        info: $scope.description,
        choices: $scope.choices,
        active: true,
        user: user
      }
      $http.post('/api/polls', poll).success(function(addedPoll) {
        console.log(addedPoll);
        window.location.href="/";
      });
    }
    // $scope.$watch(function(scope) {
    // 	console.log(scope.choices)
    // })
    	// name: String,
		  // info: String,
		  // choices: Array,
		  // active: Boolean,
		  // user: String
  });
