
angular.module('app')
    .service('private_apis' , [
        'api_sender',
        function(api_sender) {

            var self = this;

            var server_url = 'https://webapp.digitalsurge.io/';
        
        // get bids list
            self.GetBalance = function (callback) {
                
                var api_url = 'api/private/balances/';

                api_sender.sendApiRequest('GET' , server_url + api_url).then(
                    function(res) {   
                        callback(res.data);  
                    },
                    function(res) {
                        callback(false);
                    }
                );
            };

    // get aud transactions
        // get data from url
            self.GetDataWithUrl = function(url, callback) {
                api_sender.sendApiRequest('GET', url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );                
            }

        // get aud deposit
            self.GetAUDDeposit = function (callback) {
                var api_url = 'api/private/aud-deposits/';

                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            };

            self.GetAUDDepositWithPage = function(page, callback) {
                var api_url = 'api/private/aud-deposits/';

                api_sender.sendApiRequest('GET', server_url + api_url + '?page=' + page).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

            self.AddAUDDeposit = function (data, callback) {
                var api_url = 'api/private/aud-deposits/';

                api_sender.sendApiRequest('POST', server_url + api_url, data).then(
                    function(res) {
                        callback(true);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

        // get aud deposit
            self.GetAUDWithdrawals = function (callback) {
                var api_url = 'api/private/aud-withdrawals/';

                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            };

            self.GetAUDWithdrawalsWithPage = function(page, callback) {
                var api_url = 'api/private/aud-withdrawals/';

                api_sender.sendApiRequest('GET', server_url + api_url + '?page=' + page).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

            self.AddAUDWithdraw = function (data) {
                var api_url = 'api/private/aud-withdrawals/';

                api_sender.sendApiRequest('POST', server_url + api_url, data).then(
                    function(res) {
                    }, function(res) {
                    }
                );
            }

    // get btc transactions
        // get btc deposit
            self.GetBTCDeposit = function (callback) {
                var api_url = 'api/private/btc-deposits/';

                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            };

            self.GetBTCDepositWithPage = function(page, callback) {
                var api_url = 'api/private/btc-deposits/';

                api_sender.sendApiRequest('GET', server_url + api_url + '?page=' + page).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }
        // get btc address list
            self.GetBTCAddressTable = function (callback) {
                var api_url = 'api/private/btc-addresses/';

                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

        // get btc withdrawals
            self.GetBTCWithdrawals = function (callback) {
                var api_url = 'api/private/btc-withdrawals/';

                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            };

            self.GetBTCWithdrawalsWithPage = function(page, callback) {
                var api_url = 'api/private/btc-withdrawals/';

                api_sender.sendApiRequest('GET', server_url + api_url + '?page=' + page).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

            self.AddBTCWithdrawals = function (data, callback) {
                var api_url = 'api/private/btc-withdrawals/';

                api_sender.sendApiRequest('POST', server_url + api_url, data).then(
                    function(res) {
                        callback(true);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

        // get trades
            self.GetTrades = function (callback) {
                var api_url = 'api/private/trades/';

                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            };

            self.GetTradeslsWithPage = function(page, callback) {
                var api_url = 'api/private/trades/';

                api_sender.sendApiRequest('GET', server_url + api_url + '?page=' + page).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }
        // get bank account list
            self.GetBankAccountList = function (callback) {
                var api_url = 'api/private/aud-bank-accounts/';
                
                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

        // get aud-wallet-transactions
            self.GetAUDWalletTransaction = function (callback) {
                var api_url = 'api/private/aud-wallet-transactions/';
                
                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

            self.GetAUDWalletTransactionWithPage = function(page, callback) {
                var api_url = 'api/private/aud-wallet-transactions/';

                api_sender.sendApiRequest('GET', server_url + api_url + '?page=' + page).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }
        }
    ])
;