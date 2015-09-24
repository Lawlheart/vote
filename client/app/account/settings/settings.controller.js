'use strict';

angular.module('workspaceApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth, ngToast) {
    $scope.colors = ["#5bc0de", "#62c462", "#f89406", "#ee5f5b"];
    $scope.errors = {};
    $scope.user = Auth.getCurrentUser();
    $http.get('/api/polls').success(function(polls) {
      $scope.polls = polls.filter(function(poll) {
        console.log(poll.user, $scope.user.name)
        return poll.user === $scope.user.name;
      })
      console.log($scope.polls)
    });
    $scope.getMax = function(poll) {
      var max = 0;
      for(var i=0;i<poll.choices.length;i++) {
        if(poll.choices[i].votes > max) {
          max = poll.choices[i].votes;
        }
      }
      console.log(max)
      return max;
    }
    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.deletePoll = function(pollId) {
      var url = "/api/polls/" + pollId;
      if($scope.confirm) {
        $http.delete(url).success(function(err, data) {
          $scope.polls = $scope.polls.filter(function(poll) {
            return poll._id !== pollId;
          });
          ngToast.create({
            className: 'danger',
            content: 'Poll Sucessfuly Deleted'
          });
          $scope.confirm = false;
        });
      } else {
        $scope.confirm = true;
        ngToast.create({
          className: 'warning',
          content: 'Are you sure you want to delete this poll? Click delete again to confirm.'
        });
      }

    };
  });
