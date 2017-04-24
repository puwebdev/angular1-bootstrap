/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',

        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
            $urlRouterProvider
                .otherwise('login');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'tpl/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'LoginController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'api_sender',
                                    'authentication'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/login.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: "tpl/app.html",
                    controller: 'SidebarCtrl',
                    controllerAs: 'SidebarController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'api_sender',                                
                                    'authentication'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/sidebar.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'tpl/dashboard.html',
                    controller: 'DashboardCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'nvd3',
                                    'mapplic',
                                    'rickshaw',
                                    'sparkline',
                                    'public_apis',
                                    'private_apis',
                                    'dataTables'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/dashboard.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.accounts', {
                        url: "/accounts",
                        template: '',
                    })
                    .state('app.accounts.summary', {
                        url: '/accounts/summary',
                        templateUrl: 'tpl/accounts/summary.html',
                        controller: 'AccountsSummaryCtrl',
                        controllerAs: 'AccountsSummaryController',
                        resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                        'dataTables'
                                    ], {
                                        insertBefore: '#lazyload_placeholder'
                                    })
                                    .then(function() {
                                        return $ocLazyLoad.load([
                                            'assets/js/controllers/accounts.js'
                                        ]);
                                    });
                            }]
                        }
                    })
                    .state('app.accounts.transactions', {
                        url: '/accounts/transactions',
                        templateUrl: 'tpl/accounts/transactions.html',
                        controller: 'AccountsTransactionsCtrl',
                        controllerAs: 'AccountsTransactionsController',
                        resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                        'dataTables'
                                    ], {
                                        insertBefore: '#lazyload_placeholder'
                                    })
                                    .then(function() {
                                        return $ocLazyLoad.load([
                                            'assets/js/controllers/accounts.js'
                                        ]);
                                    });
                            }]
                        }
                    })
                    .state('app.accounts.deposit', {
                        url: '/accounts/deposit',
                        templateUrl: 'tpl/accounts/deposit.html',
                        controller: 'AccountsDepositCtrl',
                        controllerAs: 'AccountsDepositController',
                        resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                        'dataTables'
                                    ], {
                                        insertBefore: '#lazyload_placeholder'
                                    })
                                    .then(function() {
                                        return $ocLazyLoad.load([
                                            'assets/js/controllers/accounts.js'
                                        ]);
                                    });
                            }]
                        }
                    })
                    .state('app.accounts.transfer', {
                        url: '/accounts/transfer',
                        templateUrl: 'tpl/accounts/transfer.html',
                        controller: 'AccountsTransferCtrl',
                        controllerAs: 'AccountsTransferController',
                        resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                        'dataTables'
                                    ], {
                                        insertBefore: '#lazyload_placeholder'
                                    })
                                    .then(function() {
                                        return $ocLazyLoad.load([
                                            'assets/js/controllers/accounts.js'
                                        ]);
                                    });
                            }]
                        }
                    })
                .state('app.pageone', {
                    url: '/pageone',
                    templateUrl: 'tpl/pageone.html',
                    controller: 'PageoneCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'nvd3',
                                    'mapplic',
                                    'rickshaw',
                                    'sparkline',
                                    'public_apis',
                                    'private_apis',
                                    'dataTables'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/pageone.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.depositbtc', {
                    url: '/depositbtc',
                    templateUrl: 'tpl/depositbtc.html',
                    controller: 'DepositBTCCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'nvd3',
                                    'mapplic',
                                    'rickshaw',
                                    'sparkline',
                                    'public_apis',
                                    'private_apis',
                                    'dataTables'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/depositbtc.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.withdrawbtc', {
                    url: '/withdrawbtc',
                    templateUrl: 'tpl/withdrawbtc.html',
                    controller: 'WithdrawBTCCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'nvd3',
                                    'mapplic',
                                    'rickshaw',
                                    'sparkline',
                                    'public_apis',
                                    'private_apis',
                                    'dataTables'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/withdrawbtc.js'
                                    ]);
                                });
                        }]
                    }
                })

                .state('app.withdrawaud', {
                    url: '/withdrawaud',
                    templateUrl: 'tpl/withdrawaud.html',
                    controller: 'WithdrawAUDCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'nvd3',
                                    'mapplic',
                                    'rickshaw',
                                    'sparkline',
                                    'public_apis',
                                    'private_apis',
                                    'dataTables'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/withdrawaud.js'
                                    ]);
                                });
                        }]
                    }
                })

                .state('app.sellbtcnew', {
                    url: '/sellbtcnew',
                    templateUrl: 'tpl/sellbtcnew.html',
                    controller: 'SellBTCNew',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'nvd3',
                                    'mapplic',
                                    'rickshaw',
                                    'sparkline',
                                    'public_apis',
                                    'private_apis',
                                    'dataTables'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/sellbtcnew.js'
                                    ]);
                                });
                        }]
                    }
                })
        }
    ]);