'use strict';

/* Controllers */

angular.module('app')
    .controller('LoginCtrl', [
    	'$scope',
    	'$cookies',
    	'$state',
    	'authentication',
    	function($scope, $cookies, $state, authentication) 
    	{

    	// login form submit
    		$scope.authentication = function() {

                authentication.Login($scope.user.username, $scope.user.password, function(res){
                    if (res) {
                        $state.go('app.dashboard');
                    }   else    {
                        $scope.login.error = true;
                    }
                });

    		};

        // facebook login button click event
            $scope.facebook_login = function($event) {
                
                FB.login(function(facebookOauth) {
                    if(facebookOauth.status === 'connected'){
                        authentication.ConvertToken(facebookOauth.authResponse.accessToken, function(res) {
                            if (res) {
                                $state.go('app.dashboard');
                            }   else    {
                                $scope.login.error = true;
                            }
                        });
                    }
                },{scope:'public_profile,email'});

            };

 		}
 ]);
