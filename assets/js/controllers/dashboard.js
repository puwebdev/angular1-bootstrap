'use strict';

/* Controllers */

angular.module('app', ['ngTable'])
    .controller('DashboardCtrl', [
    	'$scope',
    	'$timeout',
    	'$http',
    	'public_apis',
    	'private_apis',
    	'NgTableParams',
    	function($scope, $timeout, $http, public_apis, private_apis, NgTableParams) {

    	// define variables
    		$scope.account_info = {
    			balance: null,
    			transactions: {
    				aud: null,
    				btc: null,
    				trades: null
    			},
    			enquity: {
    				available: 0,
    				total: 0
    			}
    		};
    		$scope.trasactions = [];
    		$scope.t_option = 'AUD';
    		$scope.latest_price = 0;
    		$scope.account_info.transactions.aud = [];

	    // get balance
	    	private_apis.GetBalance(function(res) {
	    		if (res) {
	    			$scope.account_info.balance = res;
			    // get public trades history for getting price
			    	public_apis.GetTradesHistory(1, function(res) {
			    		if (res) {
			    			$scope.latest_price = res.results[0].price;
			    			$scope.account_info.enquity.available = GetEnquity('available');
			    			$scope.account_info.enquity.total = GetEnquity('total');			    			
			    		}
			    	});	    			
	    		}
	    	});

	    // get array by id
	    	function getArrayById(arr) {
	    		var newArr = [];
	    		for (var i = arr.length - 1; i >= 0; i--) {
	    			if (!newArr[arr[i].object_id]) {
	    				newArr[arr[i].object_id] = [];
	    			}
	    			newArr[arr[i].object_id][arr[i].source] = arr[i].resulting_balance;
	    		}
	    		return newArr;
	    	}

	    // get aud-wallet-transactions
    		private_apis.GetAUDWalletTransaction(function(data) {
    			var wallets = data.results;
    			var count = (data.count-1) / 10 + 1;
    			for (var i = 2; i <= count; i++) {
    				private_apis.GetAUDWalletTransactionWithPage(i, function(data1) {
    					wallets = wallets.concat(data1.results);
    					$scope.audWalletTransaction = getArrayById(wallets);
    				});
    			}

    		});

    	// get trades
    		private_apis.GetTrades(function(data) {
    			var deposits = data.results;
    			$scope.account_info.transactions.aud = $scope.account_info.transactions.aud.concat(SetTransactionType(deposits, 'trade'));
    			$scope.SelectOption();
    			var count = (data.count-1) / 10 + 1;
    			for (var i = 2; i <= count; i++) {
    				private_apis.GetTradeslsWithPage(i, function(data1) {
    					deposits = (data1.results);
    					$scope.account_info.transactions.aud = $scope.account_info.transactions.aud.concat(SetTransactionType(deposits, 'trade'));
    					$scope.account_info.transactions.aud.sort(function(a,b){return b.created.localeCompare(a.created)});
						$scope.SelectOption();
    				});
    			}
    		});

	    // get aud deposit
    		private_apis.GetAUDDeposit(function(data) {
    			var deposits = data.results;
    			$scope.account_info.transactions.aud = $scope.account_info.transactions.aud.concat(SetTransactionType(deposits, 'deposit'));
    			$scope.SelectOption();
    			var count = (data.count-1) / 10 + 1;
    			var ii = 2;
    			for (var i = 2; i <= count; i++) {
    				private_apis.GetAUDDepositWithPage(i, function(data1) {
    					deposits = (data1.results);
    					$scope.account_info.transactions.aud = $scope.account_info.transactions.aud.concat(SetTransactionType(deposits, 'deposit'));
    					$scope.account_info.transactions.aud.sort(function(a,b){return b.created.localeCompare(a.created)});
						$scope.SelectOption();
    				});
    			}
    		});
    		
    	// get aud withdrawal
    		private_apis.GetAUDWithdrawals(function(data) {
    			var deposits = data.results;
    			$scope.account_info.transactions.aud = $scope.account_info.transactions.aud.concat(SetTransactionType(deposits, 'withdrawal'));
    			$scope.SelectOption();
    			var count = (data.count-1) / 10 + 1;
    			for (var i = 2; i <= count; i++) {
    				private_apis.GetAUDWithdrawalsWithPage(i, function(data1) {
    					deposits = (data1.results);
    					$scope.account_info.transactions.aud = $scope.account_info.transactions.aud.concat(SetTransactionType(deposits, 'withdrawal'));

    					$scope.account_info.transactions.aud.sort(function(a,b){return b.created.localeCompare(a.created)});
						$scope.SelectOption();
    				});
    			}
    		});
/*
	    	private_apis.GetAUDDeposit(function(res) {
	    		var deposits, withdrawals, trades = null;
	    		if (res) {
	    			deposits = res.results;
			    // get aud withdrawals
			    	private_apis.GetAUDWithdrawals(function(res) {
			    		if (res) {
			    			withdrawals = res.results;
						// get trades history
							private_apis.GetTrades(function(res) {
								if (res) {
									trades = res.results;
									$scope.account_info.transactions.aud = GetTransaction(SetTransactionType(deposits, 'DEP'), SetTransactionType(withdrawals, 'WTH'));
									//$scope.account_info.transactions.aud = (GetTransaction(SetTransactionType(sendTrades2Acc(trades), 'Trades'), temp));
    								$scope.account_info.transactions.aud.sort(function(a,b){return b.created.localeCompare(a.created)});
									$scope.SelectOption();
								}
							});
			    		}
			    	});
	    		}
	    	});

		// get btc deposit
			private_apis.GetBTCDeposit(function(res) {
				var deposits = null;
				var withdrawals = null;
				if (res) {
					deposits = res.results;
				// get btc withdrawals
					private_apis.GetBTCWithdrawals(function(res) {
						if (res) {
							withdrawals = res.results;
							$scope.account_info.transactions.btc = GetTransaction(SetTransactionType(deposits, 'DEP'), SetTransactionType(withdrawals, 'WTH'));
							$scope.account_info.transactions.btc.sort(function(a,b){return b.created.localeCompare(a.created)});
							$scope.SelectOption();
						}
					});
				}
			});
*/
	// scope functions
		// refresh as selected option
			$scope.SelectOption = function () {
				if ($scope.t_option == 'AUD') {
					$scope.transactions = $scope.account_info.transactions.aud;
				}	else if ($scope.t_option == 'BTX')	{
					$scope.transactions = $scope.account_info.transactions.btc;
				}

				$scope.usersTable = new NgTableParams({
	                page: 1,
	                count: 10
	            }, {
	                total: $scope.transactions.length, 
	                getData: function (params) {
	                    $scope.data = $scope.transactions.slice((params.page() - 1) * params.count(), params.page() * params.count());
	                    //$defer.resolve($scope.data);
	                    return $scope.data;
	                }
	            });
			};

		// change output price value
			function numberWithCommas(x) {
			    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
			}		
			$scope.toPriceString = function (price) {
				if (!price) return "";
				price = parseFloat(price).toFixed(2);
				if (price) {
					return numberWithCommas(price);
				}	else	{
					return '0.00';
				}
			};

		// identify deposit or withdrawal
			$scope.printAmount = function (item, opt) {

				if (item.status == "Processed") {
					let val = '';
					if (item.type == 'withdrawal') {
						if (opt == 'withdrawal') val = item.amount;

						else val = '';
					}	else	{
						if (opt == 'DEP') val = item.amount;
						else val = '';
					}
					if ($scope.t_option == 'AUD') {
						if (val) return '$' + $scope.toPriceString(val);
						return '';
					}	else	{
						return val;
					}			
				}	else if (item.status == "Trades")	{
					if (opt == 'DEP') {
						if (item.direction == 'sell') {return '$' + $scope.toPriceString(item.price);}
					}
					if (opt == 'WTH') {
						if (item.direction == 'sell') {return '$' + $scope.toPriceString(item.qc_fee);}
						if (item.direction == 'buy') {return '$' + $scope.toPriceString(parseFloat(item.price) + parseFloat(item.qc_fee));}
					}
					return '';
				}	else {return '';}	
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

		// calculating equity
			function GetEnquity(opt) {
				if (opt == 'available') {
	    			if ($scope.account_info.balance.available.BTC && $scope.latest_price) {
						return $scope.account_info.balance.available.BTC * $scope.latest_price + $scope.account_info.balance.available.AUD;
	    			}	else	{
	    				return '0.00';
	    			}
				}	else if (opt == 'total') {
	    			if ($scope.account_info.balance.total.BTC && $scope.latest_price) {
						return $scope.account_info.balance.total.BTC * $scope.latest_price + $scope.account_info.balance.total.AUD;
	    			}	else	{
	    				return '0.00';
	    			}
				}
			};

		// merge deposit and withdrawals and sort it out by date
			function GetTransaction(a, b) {
				var alen = a.length
			      , blen = b.length
			      , i, j, k = j = i = 0
			      , answer = new Array(alen + blen)
			    ;//var
			    while(i < alen && j < blen)
                    answer[k++] = Date.parse(a[i].created) < Date.parse(b[j].created) ? a[i++] : b[j++];
			    while(i < alen) answer[k++] = a[i++];
			    while(j < blen) answer[k++] = b[j++];

			    return answer;
			};

		// add property for recognizing type
			function SetTransactionType(array, opt) {
				for (var i = 0; i < array.length; i++) {
					array[i].type = opt;
					if (opt === "deposit") {
						array[i].money_in = array[i].amount;
						array[i].money_out = "";
						array[i].details = "AUD Deposit"
					} else if (opt === "withdrawal") {
						array[i].money_out = array[i].amount;
						array[i].money_in = "";
						array[i].details = "AUD Withdrawal"
					} else if (opt === "trade") {
						array[i].money_in = array[i].direction == "buy" ? "" : array[i].qc_amount;
						array[i].money_out = array[i].direction == "sell" ? "" : array[i].qc_amount;
						array[i].details = "Successful trade, Matching fee = $" + array[i].qc_fee;
						array[i].status = 'Processed';
					}
				}
				return array;
			};

		// toggle trades data to account info object
			function sendTrades2Acc(obj) {
				var temp = [];
				for (var i = 0; i < obj.length; i++) {
					temp.push(obj[i]);
					temp[i].status = 'Trades';
				}
				return temp;
			};
    }]);
