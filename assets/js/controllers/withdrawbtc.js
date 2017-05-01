'use strict';

/* Controllers */

angular.module('app', ['ngTable'])
    .controller('WithdrawBTCCtrl', [
    	'$scope',
    	'$timeout',
    	'$http',
    	'public_apis',
    	'private_apis',
        'NgTableParams',
    	function($scope, $timeout, $http, public_apis, private_apis, NgTableParams) {
    		$scope.amount = [];
    		private_apis.GetBalance(function (data) {
    			if (data) {
    				$scope.available_balance_btc = data.available.BTC;
    			}
    		});

    		private_apis.GetBTCAddressTable(function(data) {
    			if (data) {
    				$scope.btc_addresses = data.results;

    				for (var i = $scope.btc_addresses.length - 1; i >= 0; i--) {
    					$scope.amount[i] = 0;
    				}
    			}
    		});


            function buildTable() {                
                $scope.usersTable = new NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.btc_withdrawals.length, 
                    getData: function (params) {
                        $scope.data = $scope.btc_withdrawals.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        //$defer.resolve($scope.data);
                        return $scope.data;
                    }
                });
            }

    		private_apis.GetBTCWithdrawals(function(data) {
                $scope.btc_withdrawals = data.results;
                $scope.btc_withdrawals.sort(function(a,b){return b.created.localeCompare(a.created)});
                buildTable();
                var count = (data.count-1) / 10 + 1;
                for (var i = 2; i <= count; i++) {
                    private_apis.GetBTCWithdrawalsWithPage(i, function(data1) {
                        $scope.btc_withdrawals = $scope.btc_withdrawals.concat(data1.results);
                        $scope.btc_withdrawals.sort(function(a,b){return b.created.localeCompare(a.created)});
                        buildTable();
                    });
                }
            });

    		$scope.btcWithdrawClick = function(index) {
    			if ($scope.withdraw_btc_amount > 0) {
	    			var item = {
	    				amount: $scope.withdraw_btc_amount,
	    				address: $scope.btc_addresses[index].btc_address,
	    			}
	    			private_apis.AddBTCWithdrawals(item, function(res) {
	    				if (res) {
				    		private_apis.GetBTCWithdrawals(function(data) {
				                $scope.btc_withdrawals = data.results;
				                $scope.btc_withdrawals.sort(function(a,b){return b.created.localeCompare(a.created)});
				                var count = (data.count-1) / 10 + 1;
				                for (var i = 2; i <= count; i++) {
				                    private_apis.GetBTCWithdrawalsWithPage(i, function(data1) {
				                        console.log(2);
				                        $scope.btc_withdrawals = $scope.btc_withdrawals.concat(data1.results);
				                        $scope.btc_withdrawals.sort(function(a,b){return b.created.localeCompare(a.created)});
				                    });
				                }
				            });	    					
	    				}
	    			});	    			
	    		}
    		}

    		$scope.withdraw_btc_click = function() {
    			if ($scope.withdraw_btc_amount > 0) {
					var item = {
	    				amount: $scope.withdraw_btc_amount,
	    				address: $scope.withdraw_btc_address,
	    			}
	    			private_apis.AddBTCWithdrawals(item, function(res) {
	    				if (res) {
				    		private_apis.GetBTCWithdrawals(function(data) {
				                $scope.btc_withdrawals = data.results;
				                $scope.btc_withdrawals.sort(function(a,b){return b.created.localeCompare(a.created)});
				                var count = (data.count-1) / 10 + 1;
				                for (var i = 2; i <= count; i++) {
				                    private_apis.GetBTCWithdrawalsWithPage(i, function(data1) {
				                        console.log(2);
				                        $scope.btc_withdrawals = $scope.btc_withdrawals.concat(data1.results);
				                        $scope.btc_withdrawals.sort(function(a,b){return b.created.localeCompare(a.created)});
				                    });
				                }
				            });	    					
	    				}
	    			});
    			}
    		}

	// scope functions
		// change date string to human readable
			$scope.toDateReadable = function (dateString) {
				let dateObj = new Date(dateString);
				let monthNames = ["January", "February", "March", "April", "May", "June"
					, "July", "August", "September", "October", "November", "December"];
				let temp = to2(dateObj.getHours()) + ':' 
					+ to2(dateObj.getMinutes()) + ':' + to2(dateObj.getSeconds()) + ' ' + dateObj.getDate() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getFullYear();
				return temp;
			};

	// custom functions

		// change time string to 2length string
			function to2(num) {
				if (num < 10) {
					return '0' + num;
				}	else	{
					return num;
				}
			};
    }]);
