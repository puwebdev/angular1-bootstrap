'use strict';

/* Controllers */

angular.module('app', ['ngTable'])
    .controller('AddressBookCtrl', [
    	'$scope',
    	'$timeout',
    	'$http',
    	'public_apis',
    	'private_apis',
        'NgTableParams',
    	function($scope, $timeout, $http, public_apis, private_apis, NgTableParams) {
    		$scope.btc_address = "";
            $scope.btc_address_name = "";
            $scope.btc_withdrawal_addresses = [];

            function getAddress() {
                private_apis.GetBTCWithdrawalAddress(function(res) {
                    if (res.getStatus) {
                        var data = res.data;
                        $scope.btc_withdrawal_addresses = data.results;
                        $scope.btc_withdrawal_addresses.sort(function(a,b){return b.created.localeCompare(a.created)});
                        buildTable();

                        var count = (data.count-1) / 10 + 1;
                        for (var i = 2; i <= count; i++) {
                            private_apis.GetBTCWithdrawalAddressWithPage(i, function(data1) {
                                data = data.concat(data1.results);
                                $scope.btc_withdrawal_addresses = data;
                                $scope.btc_withdrawal_addresses.sort(function(a,b){return b.created.localeCompare(a.created)});
                                buildTable();
                            });
                        }
                    } else {
                        var options = {style: "simple", message: res.data[Object.keys(res.data)[0]], type: "error", timeout: 0};
                        jQuery('body').pgNotification(options).show();
                    }
                });
            }

            var originalData = [];

            function buildTable() {
                originalData = angular.copy($scope.btc_withdrawal_addresses);

                $scope.usersTable = new NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.btc_withdrawal_addresses.length, 
                    getData: function (params) {
                        $scope.data = $scope.btc_withdrawal_addresses.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        //$defer.resolve($scope.data);
                        return $scope.data;
                    }
                });
            }

            getAddress();

            $scope.addAddress = function() {
                var item = {
                    "label": $scope.btc_address_name,
                    "address": $scope.btc_address
                }

                private_apis.addWithdrawalAddress(item, function(res) {
                    if (res.getStatus) {
                        var options = {style: "simple", message: "BTC Address successfully stored", type: "success", timeout: 0};
                        jQuery('body').pgNotification(options).show();
                        getAddress();
                    } else {
                        var options = {style: "simple", message: res.data[Object.keys(res.data)[0]], type: "error", timeout: 0};
                        jQuery('body').pgNotification(options).show();
                    }
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

    // edit save ng table

        $scope.cancel =  function(row, rowForm) {
          row.isEditing = false;
            $scope.btc_withdrawal_addresses = angular.copy(originalData);
          buildTable();
        }

        $scope.del = function(row) {
            if (!confirm("Do you want to delete this withdrawal address?")) {
                return;
            }
            private_apis.DeleteBTCWithdrawalAdressWithId(row.id, function(res) {
                if (res.getStatus) {
                    var options = {style: "simple", message: "BTC address is sucessfully deleted", type: "success", timeout: 0};
                    jQuery('body').pgNotification(options).show();
                    getAddress();
                } else {
                    var options = {style: "simple", message: res.data[Object.keys(res.data)[0]], type: "error", timeout: 0};
                    jQuery('body').pgNotification(options).show();
                }
            });
        }

        $scope.save = function(row, rowForm) {

            var addresses = originalData.map(function(a) {return a.address;});
            console.log(addresses, row.address);
            if (addresses.indexOf(row.address) > -1) {
                var options = {style: "simple", message: "Withdrawals address already exists, please enter different address", type: "error", timeout: 0};
                jQuery('body').pgNotification(options).show();
                return;
            }

            //console.log(1, WAValidator);

            //if (window.WAValidator.validate(row.address, 'bitcoin')) {
                //var options = {style: "simple", message: "Invalid Bitcoin Address", type: "error", timeout: 0};
                //jQuery('body').pgNotification(options).show();
                //return;
            //}

            // delete the current row and add new one with changed data
               
            var item = {
                "label": row.label,
                "address": row.address
            }

            private_apis.addWithdrawalAddress(item, function(res) {
                if (res.getStatus) {
                    private_apis.DeleteBTCWithdrawalAdressWithId(row.id, function(res) {
                        if (res.getStatus) {     
                            var options = {style: "simple", message: "Withdrawals address is sucessfully edited", type: "success", timeout: 0};
                            jQuery('body').pgNotification(options).show();
                            getAddress();
                        } else {
                            var options = {style: "simple", message: res.data[Object.keys(res.data)[0]], type: "error", timeout: 0};
                            jQuery('body').pgNotification(options).show();
                        }
                    });   
                } else {
                    var options = {style: "simple", message: res.data[Object.keys(res.data)[0]], type: "error", timeout: 0};
                    jQuery('body').pgNotification(options).show();
                }
            });

        }
    }]);
