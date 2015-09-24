'use strict';

angular.module('workspaceApp')
  .controller('PollsCtrl', function ($scope, $routeParams, $http) {
    $scope.loaded = false;
		$scope.poll ={};
		$scope.step = 1;
		$scope.colors = ["#5bc0de", "#62c462", "#f89406", "#ee5f5b"];
		$scope.choices = [];
    var url = '/api/polls/' + $routeParams.pollid;
  	$scope.fullUrl = 'http://vote-lawlietblack.herokuapp.com/polls/' + $routeParams.pollid;
    $http.get(url).success(function(poll) {
    	$scope.loaded = true;
      $scope.poll = poll;
      console.log(poll);
      for(var i=0;i<poll.choices.length;i++) {
      	$scope.choices.push(poll.choices[i].choice);
      };
    });

    $scope.choose = function(optIndex) {
    	$scope.chosen = optIndex;
    	$('.active').removeClass('active');
    	$('#choices li').eq(optIndex).addClass('active')
    }
    $scope.chooseWriteIn = function() {
    	$scope.chosen = "writeIn"
    	$('.active').removeClass('active');
    	$('#writeIn').addClass('active')
    }
    $scope.vote = function() {
    	if($scope.chosen === undefined) {
    		alert("Please choose an option");
    		return
    	}
    	if($scope.chosen === "writeIn") {
    		var newChoice = $('#writeIn').val();
    		if($scope.choices.indexOf(newChoice) < 0) {
	    		$scope.poll.choices.push({
	    			choice: newChoice,
	    			votes: 1
	    		});
    		} else {
    			$scope.poll.choices[$scope.choices.indexOf(newChoice)].votes += 1;
    		}
    	} else {
	    	$scope.poll.choices[$scope.chosen].votes += 1;
    	}
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
    $scope.share = function() {
    	var message = "Come vote for " + $scope.poll.name + " at " + $scope.fullUrl;
  		// console.log(encodeURI(quote))
  		var width  = 575,
      height = 400,
      left   = ($(window).width()  - width)  / 2,
      top    = ($(window).height() - height) / 2,
      url    = 'https://twitter.com/intent/tweet',
      opts   = 'status=1' +
               ',width='  + width  +
               ',height=' + height +
               ',top='    + top    +
               ',left='   + left;
  		window.open(url + "?text=" + encodeURI(message), 'twitter', opts);
  		return false;
    }
  });
