'use strict';

/* Controllers */

angular.module('app', ['ngTable'])
    .controller('TransferBTCCtrl', [
    	'$scope',
    	'$timeout',
    	'$http',
    	'public_apis',
    	'private_apis',
        'NgTableParams',
    	function($scope, $timeout, $http, public_apis, private_apis, NgTableParams) {
    		$scope.amount = [];

			$scope.btc_address = "";
            $scope.btc_address_name = "";
            $scope.btc_withdrawal_addresses = [];

            function getAddress() {
                private_apis.GetBalance(function (data) {
                    if (data) {
                        $scope.available_balance_btc = data.available.BTC;
                    }
                });

                private_apis.GetBTCWithdrawalAddress(function(res) {
                    if (res.getStatus) {
                        var data = res.data;
                        $scope.btc_withdrawal_addresses = data.results;
                        $scope.btc_withdrawal_addresses.sort(function(a,b){return b.created.localeCompare(a.created)});

                        var count = (data.count-1) / 10 + 1;
                        for (var i = 2; i <= count; i++) {
                            private_apis.GetBTCWithdrawalAddressWithPage(i, function(data1) {
                                data = data.concat(data1.results);
                                $scope.btc_withdrawal_addresses = data;
                                $scope.btc_withdrawal_addresses.sort(function(a,b){return b.created.localeCompare(a.created)});
                            });
                        }
                    } else {
                        console.log("get btc withdrawal address failed: ", res);
                        var options = {style: "simple", message: res.data[Object.keys(res.data)[0]], type: "error", timeout: 0};
                        jQuery('body').pgNotification(options).show();
                    }
                });
            }

            getAddress();

            $scope.addressClicked = function(item) {
            	console.log("item",item);
            	$scope.btc_address =  item.address;
            }

            $scope.confirm_show = false;

            $scope.openTransferBtcModal = function() {
                $scope.confirm_show = true;
                $scope.policy_checked = false;
            }

            $scope.closeTransferBtcModal = function() {
                $scope.confirm_show = false;
                $scope.policy_checked = false;
            }

            $scope.transferBTC = function() {
                var item = {
                    amount: $scope.transfer_amount,
                    address: $scope.btc_address,
                }
                private_apis.AddBTCWithdrawals(item, function(res) {
                    if (res.getStatus) {
                        var options = {style: "simple", message: "BTC Successfully transferred", type: "success", timeout: 0};
                        jQuery('body').pgNotification(options).show();
                        getAddress();
                    } else {
                        var options = {style: "simple", message: res.data[Object.keys(res.data)[0]], type: "error", timeout: 0};
                        jQuery('body').pgNotification(options).show();
                    }
                });
                $scope.confirm_show = false;
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
