'use strict';

/* Controllers */

angular.module('app', ['ngTable'])
    .controller('WithdrawAUDCtrl', [
    	'$scope',
    	'$timeout',
    	'$http',
    	'public_apis',
    	'private_apis',
        'NgTableParams',
    	function($scope, $timeout, $http, public_apis, private_apis, NgTableParams) {
    		private_apis.GetBalance(function (data) {
    			if (data) {
    				$scope.available_balance_aud = data.available.AUD;
    			}
    		});

            private_apis.GetAUDWithdrawals(function(data) {
                $scope.withdrawals = data.results;
                $scope.withdrawals.sort(function(a,b){return b.created.localeCompare(a.created)});
                buildTable();
                var count = (data.count-1) / 10 + 1;
                for (var i = 2; i <= count; i++) {
                    private_apis.GetAUDWithdrawalsWithPage(i, function(data1) {
                        $scope.withdrawals = $scope.withdrawals.concat(data1.results);
                        $scope.withdrawals.sort(function(a,b){return b.created.localeCompare(a.created)});
                        buildTable();
                    });
                }
            });


            function buildTable() {                
                $scope.usersTable = new NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.withdrawals.length, 
                    getData: function (params) {
                        $scope.data = $scope.withdrawals.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        //$defer.resolve($scope.data);
                        return $scope.data;
                    }
                });
            }


    		private_apis.GetBankAccountList(function(data) {
    			if(data) {
    				$scope.bankAccount = data.results[0];
    			}
    		});

    		$scope.btnWithdrawClick = function() {
    			if ($scope.withdraw_amount > 0) {
    				var item = {
    					amount: $scope.withdraw_amount,
    					bank_account: 'https://webapp.digitalsurge.io/api/private/aud-bank-accounts/1/',
    				};
    				private_apis.AddAUDWithdraw(item);

                    private_apis.GetAUDWithdrawals(function(data) {
                        $scope.withdrawals = data.results;
                        $scope.withdrawals.sort(function(a,b){return b.created.localeCompare(a.created)});
                        var count = (data.count-1) / 10 + 1;
                        for (var i = 2; i <= count; i++) {
                            private_apis.GetAUDWithdrawalsWithPage(i, function(data1) {
                                console.log(2);
                                $scope.withdrawals = $scope.withdrawals.concat(data1.results);
                                $scope.withdrawals.sort(function(a,b){return b.created.localeCompare(a.created)});
                            });
                        }
                    });
    			}
    		}
	// scope functions
		// change output price value
			function numberWithCommas(x) {
			    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}		
			$scope.toPriceString = function (price) {
				price = parseFloat(price).toFixed(2);
				if (price) {
					return numberWithCommas(price);
				}	else	{
					return '0.00';
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
