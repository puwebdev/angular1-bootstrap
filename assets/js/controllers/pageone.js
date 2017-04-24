'use strict';

/* Controllers */

angular.module('app', ['ngTable'])
    .controller('PageoneCtrl', [
    	'$scope',
    	'$timeout',
    	'$http',
    	'public_apis',
    	'private_apis',
        'NgTableParams',
    	function($scope, $timeout, $http, public_apis, private_apis, NgTableParams) {
    		var depositData;
    		$scope.table_detail_style = {display: 'none'};

    		private_apis.GetAUDDeposit(function(data) {
    			depositData = data;
    			$scope.deposits = data.results;
    			$scope.deposits.sort(function(a,b){return b.created.localeCompare(a.created)});
    			buildTable();
    			var count = (data.count-1) / 10 + 1;
    			for (var i = 2; i <= count; i++) {
    				private_apis.GetAUDDepositWithPage(i, function(data1) {
    					$scope.deposits = $scope.deposits.concat(data1.results);
    					$scope.deposits.sort(function(a,b){return b.created.localeCompare(a.created)});
    					buildTable();
    				});
    			}
    		});

            function buildTable() {                
                $scope.usersTable = new NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.deposits.length, 
                    getData: function (params) {
                        $scope.data = $scope.deposits.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        //$defer.resolve($scope.data);
                        return $scope.data;
                    }
                });
            }

    		//Bank Accounts
    		$scope.bankAccounts = {
    			id: '',
    			label: '',
    			account_name: '',
    			account_number: '',
    			bank_state_branch: '',
    			amount: '',
    		};

    		$scope.btnDepositeClick = function() {
 				if (!$scope.deposite_aud_amount)  {
 					return;
 				}
	    		private_apis.GetBankAccountList(function(data) {
	    			$scope.bankAccountsData = data.results;
	    			if (data.results.length == 0) {
	    				console.log('bank account empty');
	    				return;
	    			}
	    			$scope.bankAccounts = $scope.bankAccountsData[0];
	    			$scope.bankAccounts.amount = $scope.deposite_aud_amount;

	    			var today = new Date();

	    			var deposit_item = {
	    				amount: $scope.deposite_aud_amount,
	    			};

	    			private_apis.AddAUDDeposit(deposit_item, function(res) {
	    				if (res) {
			    			$scope.table_detail_style = {display: 'block'};

				    		private_apis.GetAUDDeposit(function(data) {
				    			depositData = data;
				    			$scope.deposits = data.results;
		    					$scope.deposits.sort(function(a,b){return b.created.localeCompare(a.created)});
				    			var count = (data.count-1) / 10 + 1;
				    			for (var i = 2; i <= count; i++) {
				    				private_apis.GetAUDDepositWithPage(i, function(data1) {
				    					console.log(2);
				    					$scope.deposits = $scope.deposits.concat(data1.results);
				    					console.log($scope.deposits);
				    					$scope.deposits.sort(function(a,b){return b.created.localeCompare(a.created)});
				    					console.log($scope.deposits);
				    				});
				    			}
				    		});
	    				}
	    			});
	    		});
    		}

    // array sort function
    		function sortDepositsByDate() {
    			var tmp = $scope.deposits;
    			for (var i = 0; i < $scope.deposits.length; i++) {
    				var pos = 0;
    				for (var j = 0; j < $scope.deposits.length; j++) {
    					//if ($scope.deposits[i].created >)
    				}
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
