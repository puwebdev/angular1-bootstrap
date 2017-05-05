'use strict';

/* Controllers */

angular.module('app', ['ngTable'])
    .controller('TradeDetail', [
    	'$scope',
    	'$timeout',
    	'$http',
    	'public_apis',
    	'private_apis',
        'NgTableParams',
    	function($scope, $timeout, $http, public_apis, private_apis, NgTableParams) {
    		function updateOrdersData() {    		
	    		private_apis.GetOrders(function(data) {
	                $scope.orders = data.results;
	                $scope.orders.sort(function(a,b){return b.created.localeCompare(a.created)});
	                buildTable();
	                var count = (data.count-1) / 10 + 1;
	                for (var i = 2; i <= count; i++) {
	                    private_apis.GetOrdersWithPage(i, function(data1) {
	                        $scope.orders = $scope.orders.concat(data1.results);
	                        $scope.orders.sort(function(a,b){return b.created.localeCompare(a.created)});
	                        buildTable();
	                    });
	                }
	            });	
    		}

    		function updateTradeData() {    			
	    	// get trades
	    		private_apis.GetTrades(function(data) {
	    			$scope.trades = data.results;
	    			$scope.trades.sort(function(a,b){return b.created.localeCompare(a.created)});
	    			buildTradeTable();
	    			var count = (data.count-1) / 10 + 1;
	    			for (var i = 2; i <= count; i++) {
	    				private_apis.GetTradeslsWithPage(i, function(data1) {
	    					$scope.trades = $scope.trades.concat(data1.results);
	                        $scope.trades.sort(function(a,b){return b.created.localeCompare(a.created)});
							buildTradeTable();
	    				});
	    			}
	    		});
    		}

    		updateOrdersData();
    		updateTradeData();
    		
            function buildTable() {                
                $scope.usersTable = new NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.orders.length, 
                    getData: function (params) {
                        $scope.data = $scope.orders.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    }
                });
            }

            function buildTradeTable() {
                $scope.tradesTable = new NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.trades.length, 
                    getData: function (params) {
                        $scope.tradeData = $scope.trades.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.tradeData;
                    }
                });
            }

            $scope.deleteOrder = function(id) {
            	private_apis.DeleteOrderWithId(id, function(data1) {
            		updateOrdersData();
            	});
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

			$scope.toBTCFormatPriceString = function (price) {
				price = parseFloat(price).toFixed(8);
				if (price) {
					return numberWithCommas(price);
				}	else	{
					return '0';
				}
			};

		
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
