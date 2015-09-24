'use strict';

angular.module('workspaceApp')
  .controller('PollsCtrl', function ($scope, $routeParams, $http) {
    $scope.loaded = false;
		$scope.poll ={};
		$scope.step = 1;
		$scope.colors = ["#5bc0de", "#62c462", "#f89406", "#ee5f5b"] 

    var url = '/api/polls/' + $routeParams.pollid;
    $http.get(url).success(function(poll) {
    	$scope.loaded = true;
      $scope.poll = poll;
      console.log(poll);
    });

    $scope.choose = function(optIndex) {
    	$scope.chosen = optIndex;
    	$('.active').removeClass('active');
    	$('#choices li').eq(optIndex).addClass('active')
    }

    $scope.vote = function() {
    	if($scope.chosen === undefined) {
    		alert("Please choose an option");
    		return
    	}
    	var index = $scope.chosen;
    	$scope.poll.choices[index].votes += 1;
    	$http.put(url, $scope.poll).success(function(updatedPoll) {
    		console.log(updatedPoll);
    		$scope.max = 0;
    		for(var i=0;i<updatedPoll.choices.length;i++) {
    			if(updatedPoll.choices[i].votes > $scope.max) {
    				$scope.max = updatedPoll.choices[i].votes;
    			}
    		}
    		console.log("MAX", $scope.max)
    		$scope.step = 2;
    	})
    }

    $scope.addChoice = function(newChoice) {
    	var num = $scope.poll.choices.length;
    	$scope.poll.choices.push({
    		choice: newChoice,
        votes:0
    	})
    }
  });
