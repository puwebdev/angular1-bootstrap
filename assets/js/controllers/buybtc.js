'use strict';

/* Controllers */

angular.module('app')
    .controller('BuyBTCCtrl', [
    	'$scope',
    	'$timeout',
    	'$http',
    	'public_apis',
    	'private_apis',
    	function($scope, $timeout, $http, public_apis, private_apis) {
    		var orderbook = {};
    		var aud_commision_rate = 0;
    		var item = {};

    		$scope.subtotal = 0;
			$scope.fee = 0;
			$scope.amountToReceive = 0;
			$scope.audspend = 0;
			$scope.buyprice = 0;

			function updateData() {
	    	/// Get OrderBook
	    		private_apis.GetOrderBook(function(res) {
	    			if (res.res_status && res.data.results.length) {
	    				orderbook = res.data.results[0];
	    			} else {
	    				console.log("error: ", res);
	    			}
	    		});

	    	/// Get Profile
	    		private_apis.GetProfile(function(res) {
	    			if (res.res_status) {
	    				aud_commision_rate = res.data.aud_commision_rate;
	    			} else {
	    				console.log("error: ", res);
	    			}
	    		});

	    	/// Get Available Balance
	    		private_apis.GetBalance(function (data) {
	    			if (data) {
	    				$scope.available_balance_aud = data.available.AUD;
	    			}
	    		});
			}

			updateData();

    	/// Buy BTC button clicked
    		$scope.btnBuyBTCClicked = function() {    			
				if ($scope.oder_type == 1) {
    				var amount = $scope.audspend / 100 * (100 - aud_commision_rate) / orderbook.price;
    				item = {
					    "direction": 10,
					    "price": orderbook.price * 1.01,
					    "amount": parseFloat(amount).toFixed(8),
					    "ephemeral": true
					};
				} else {
					item = {
						"direction": 10,
					    "price": $scope.buyprice,
					    "amount": $scope.audspend,
					    "ephemeral": false
					};
				}
				console.log(item);
				private_apis.AddOrder(item, function(res) {
					if (res.res_status) {
						updateData();
						var msg = 'BTC Successfully bought';
						if ($scope.oder_type == 2) {
							msg = "Order successfully placed";
						}
                        var options = {style: "simple", message: msg, type: "success", timeout: 0};
                        jQuery('body').pgNotification(options).show();
					} else {
                        var options = {style: "simple", message: res.data[Object.keys(res.data)[0]], type: "error", timeout: 0};
                        jQuery('body').pgNotification(options).show();
					}
				});
    		}

    		$scope.calcOrder = function() {
    			if ($scope.oder_type == 1) {
    				var amount = $scope.audspend / 100 * (100 - aud_commision_rate) / orderbook.price;

    				$scope.subtotal = $scope.audspend / 100 * (100 - aud_commision_rate);
    				$scope.fee = aud_commision_rate;
    				$scope.amountToReceive = amount;
    			} else {
    				$scope.subtotal = $scope.audspend * $scope.buyprice;
    				$scope.fee = aud_commision_rate;
    				$scope.amountToReceive = $scope.subtotal * ( 100 + $scope.fee ) / 100;
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

			$scope.toBTCFormat = function (price) {
				return parseFloat(price).toFixed(8);
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
    }]);
