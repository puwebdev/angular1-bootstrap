'use strict';

/* Controllers */

angular.module('app', ['ngTable'])
    .controller('DashboardCtrl', [
    	'$scope',
    	'$timeout',
    	'$http',
    	'$filter',
    	'public_apis',
    	'private_apis',
    	'NgTableParams',
    	function($scope, $timeout, $http,$filter, public_apis, private_apis, NgTableParams) {

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
    		$scope.statuses = [{id: "", title: ""}, {id: 'Pending', title: 'Pending'}, {id: 'Processed', title: 'Processed'}];

    		var totalTransactionData = [];

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


    		function GetAudData() {	 
    			$scope.account_info.transactions.aud = [];
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
    		}


    		function GetBtcData() {	 
    			$scope.account_info.transactions.btc = [];
		    // get btc-wallet-transactions
	    		private_apis.GetBTCWalletTransaction(function(data) {
	    			var wallets = data.results;
	    			var count = (data.count-1) / 10 + 1;
	    			for (var i = 2; i <= count; i++) {
	    				private_apis.GetBTCWalletTransactionWithPage(i, function(data1) {
	    					wallets = wallets.concat(data1.results);
	    					$scope.audWalletTransaction = getArrayById(wallets);
	    				});
	    			}

	    		});

	    	// get trades
	    		private_apis.GetTrades(function(data) {
	    			var deposits = data.results;
	    			$scope.account_info.transactions.btc = $scope.account_info.transactions.btc.concat(SetTransactionType(deposits, 'trade'));
	    			$scope.SelectOption();
	    			var count = (data.count-1) / 10 + 1;
	    			for (var i = 2; i <= count; i++) {
	    				private_apis.GetTradeslsWithPage(i, function(data1) {
	    					deposits = (data1.results);
	    					$scope.account_info.transactions.btc = $scope.account_info.transactions.btc.concat(SetTransactionType(deposits, 'trade'));
	    					$scope.account_info.transactions.btc.sort(function(a,b){return b.created.localeCompare(a.created)});
							$scope.SelectOption();
	    				});
	    			}
	    		});   			
		    // get btc deposit
	    		private_apis.GetBTCDeposit(function(data) {
	    			var deposits = data.results;
	    			$scope.account_info.transactions.btc = $scope.account_info.transactions.btc.concat(SetTransactionType(deposits, 'deposit'));
	    			$scope.SelectOption();
	    			var count = (data.count-1) / 10 + 1;
	    			var ii = 2;
	    			for (var i = 2; i <= count; i++) {
	    				private_apis.GetBTCDepositWithPage(i, function(data1) {
	    					deposits = (data1.results);
	    					$scope.account_info.transactions.btc = $scope.account_info.transactions.btc.concat(SetTransactionType(deposits, 'deposit'));
	    					$scope.account_info.transactions.btc.sort(function(a,b){return b.created.localeCompare(a.created)});
							$scope.SelectOption();
	    				});
	    			}
	    		});
	    		
	    	// get btc withdrawal
	    		private_apis.GetBTCWithdrawals(function(data) {
	    			var deposits = data.results;
	    			$scope.account_info.transactions.btc = $scope.account_info.transactions.btc.concat(SetTransactionType(deposits, 'withdrawal'));
	    			$scope.SelectOption();
	    			var count = (data.count-1) / 10 + 1;
	    			for (var i = 2; i <= count; i++) {
	    				private_apis.GetBTCWithdrawalsWithPage(i, function(data1) {
	    					deposits = (data1.results);
	    					$scope.account_info.transactions.btc = $scope.account_info.transactions.btc.concat(SetTransactionType(deposits, 'withdrawal'));

	    					$scope.account_info.transactions.btc.sort(function(a,b){return b.created.localeCompare(a.created)});
							$scope.SelectOption();
	    				});
	    			}
	    		});
    		}

    		GetAudData();
    		GetBtcData();
    		$scope.t_option == 'AUD'

    		$scope.transaction_type_change = function() {
    			if ($scope.t_option == 'AUD') {
					GetAudData();
				}	else if ($scope.t_option == 'BTX')	{
					GetBtcData();
				}

    		}
	// scope functions
		// refresh as selected option
			$scope.SelectOption = function () {
				if ($scope.t_option == 'AUD') {
					$scope.transactions = $scope.account_info.transactions.aud;
				}	else if ($scope.t_option == 'BTX')	{
					$scope.transactions = $scope.account_info.transactions.btc;
				}
				totalTransactionData = angular.copy($scope.transactions);
				buildTable();
			};

			function buildTable() {				
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
			}

		// change output price value
			function numberWithCommas(x) {
			    //return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
				var parts = x.toString().split(".");
			    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			    return parts.join(".");
			}		
			$scope.toPriceString = function (price) {
				if (!price) return "";
				//price = parseFloat(price).toFixed(2);
				if (price) {
					return numberWithCommas(price);
				}	else	{
					return '0.00';
				}
			};

			$scope.toPriceStringRound2 = function (price) {
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
					item.status = 'Processed';
					return '';
				}	else {return '';}	
			};

			function removeValuesFromArray(arr, value) {
				for (var i = arr.length-1; i > -1; i--) {
					if (arr[i].status == value) {
						arr.splice(i, 1);
					}
				}
				console.log(arr);
				return angular.copy(arr);
			}

			$scope.filterWithStatus = function(n) {
				$scope.transactions = angular.copy(totalTransactionData);
				switch (n) {
					case 1:
						$scope.transactions = removeValuesFromArray($scope.transactions, "Pending");
						break;
					case 2:
						$scope.transactions = removeValuesFromArray($scope.transactions, "Processed");
						break;
				}

				buildTable();
			}

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
					if ($scope.t_option == "AUD") {
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
					} else if ($scope.t_option == "BTX") {
						array[i].type = opt;
						if (opt === "deposit") {
							array[i].money_out = "";
							array[i].money_in = array[i].amount;
							array[i].details = "BTC Deposit"
						} else if (opt === "withdrawal") {
							array[i].money_in = "";
							array[i].money_out = array[i].amount;
							array[i].details = "BTC Withdrawal"
						} else if (opt === "trade") {
							array[i].money_in = array[i].direction == "sell" ? "" : array[i].bc_amount;
							array[i].money_out = array[i].direction == "buy" ? "" : array[i].bc_amount;
							array[i].details = "Successful trade";
							array[i].status = 'Processed';
						}
					}

					if (array[i].status != "Pending") {
						array[i].status = "Processed";
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

		// export table data
			$scope.export2pdf = function() {
				$('#overview-transaction-table-pdf').tableExport({type:'pdf',
                           jspdf: {orientation: 'p',
                                   margins: {left:20, top:10},
                                   autotable: {tableWidth: 'wrap', halign: 'middle'}}
                          });
			}

			$scope.export2excel = function() {
				$('#overview-transaction-table').tableExport({type:'xlsx'});
			}
    }]);
