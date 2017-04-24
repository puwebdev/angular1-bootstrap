'use strict';

/* Controllers */

angular.module('app')
    .controller('SidebarCtrl', [
    	'$scope',
    	'authentication',
    	function($scope, authentication) {

    	// authentication check
    		if (!authentication.isAuthenticated) {
				$state.go('login');    			
    		}

    	// logout
	    	$scope.logout = function($event) {
	    		authentication.Logout(function(res) {
	    			if (res) {
	    				console.log('Logout successed!');
	    			}	else	{
	    				console.log('Logout failed!');
	    			}	
	    		});
	    	};

    }]);
