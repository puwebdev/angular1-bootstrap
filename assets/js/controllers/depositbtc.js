'use strict';

/* Controllers */

angular.module('app', ['ngTable'])
    .controller('DepositBTCCtrl', [
    	'$scope',
    	'$timeout',
    	'$http',
    	'public_apis',
    	'private_apis',
        'NgTableParams',
    	function($scope, $timeout, $http, public_apis, private_apis, NgTableParams) {
    // bulid page with api
    	// build address table
    		private_apis.GetBTCAddressTable(function(data) {
    			$scope.btc_addresses = data.results;
    		});

    	// build transfer history table
    		private_apis.GetBTCDeposit(function(data) {
    			$scope.btc_deposits = data.results;
    			$scope.btc_deposits.sort(function(a,b){return b.created.localeCompare(a.created)});
                buildTable();
    			var count = (data.count-1) / 10 + 1;
    			for (var i = 2; i <= count; i++) {
    				private_apis.GetBTCDepositWithPage(i, function(data1) {
    					$scope.btc_deposits = $scope.btc_deposits.concat(data1.results);
    					$scope.btc_deposits.sort(function(a,b){return b.created.localeCompare(a.created)});
                        buildTable();
    				});
    			}
    		});

            function buildTable() {                
                $scope.usersTable = new NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.btc_deposits.length, 
                    getData: function (params) {
                        $scope.data = $scope.btc_deposits.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        //$defer.resolve($scope.data);
                        return $scope.data;
                    }
                });
            }

	// custom functions

		// change time string to 2length string
			function to2(num) {
				if (num < 10) {
					return '0' + num;
				}	else	{
					return num;
				}
			};
// change date string to human readable
			$scope.toDateReadable = function (dateString) {
				let dateObj = new Date(dateString);
				let monthNames = ["January", "February", "March", "April", "May", "June"
					, "July", "August", "September", "October", "November", "December"];
				let temp = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate() + ' ' + to2(dateObj.getHours()) + ':' 
					+ to2(dateObj.getMinutes()) + ':' + to2(dateObj.getSeconds());
				return temp;
			};
    }]);
