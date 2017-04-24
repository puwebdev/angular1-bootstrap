'use strict';

/*	Account controllers	*/

angular.module('app')
	// account controller
	.controller('AccountsSummaryCtrl' , [
			'$scope',
		function($scope) {
    	// table-options
	        $scope.table_options = {
	           "sDom": "t",
	            "destroy": true,
	            "paging": false,
	            "scrollCollapse": true
	        }

			

		}
	])
	.controller('AccountsTransactionsCtrl' , [
			'$scope',
		function($scope) {
    	// table-options
	        $scope.table_options = {
	           "sDom": "t",
	            "destroy": true,
	            "paging": false,
	            "scrollCollapse": true
	        }

			

		}
	])
	.controller('AccountsDepositCtrl' , [
			'$scope',
		function($scope) {
    	// table-options
	        $scope.table_options = {
	           "sDom": "t",
	            "destroy": true,
	            "paging": false,
	            "scrollCollapse": true
	        }
	.controller('AccountsTransferCtrl' , [
			'$scope',
		function($scope) {
    	// table-options
	        $scope.table_options = {
	           "sDom": "t",
	            "destroy": true,
	            "paging": false,
	            "scrollCollapse": true
	        }
			

		}
	])		