
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
                        res.status = true;
                        callback(res);
                    }, function(res) {
                        res.status = false;
                        callback(res);
                    }
                );
            }

        // get aud deposit
            self.GetAUDWithdrawals = function (callback) {
                var api_url = 'api/private/aud-withdrawals/';

                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        res.getStatus = true;
                        callback(res.data);
                    }, function(res) {
                        res.getStatus = false;
                        callback(res);
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

            self.AddAUDWithdraw = function (data, callback) {
                var api_url = 'api/private/aud-withdrawals/';

                api_sender.sendApiRequest('POST', server_url + api_url, data).then(
                    function(res) {
                        res.getStatus = true;
                        callback(res);
                    }, function(res) {
                        res.getStatus = false;
                        callback(res);
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
                var api_url = 'api/private/btc-deposit-addresses/';

                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

        // get btc withdrawal address book 
            self.GetBTCWithdrawalAddress = function (callback) {
                var api_url = 'api/private/btc-withdrawal-address-book/';

                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        res.getStatus = true;
                        callback(res);
                    }, function(res) {
                        res.getStatus = false;
                        callback(res);
                    }
                );
            }

            self.GetBTCWithdrawalAddressWithPage = function(page, callback) {
                var api_url = 'api/private/btc-withdrawal-address-book/';

                api_sender.sendApiRequest('GET', server_url + api_url + '?page=' + page).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

            self.DeleteBTCWithdrawalAdressWithId = function(id, callback) {
                var api_url = 'api/private/btc-withdrawal-address-book/' + id + '/';

                api_sender.sendApiRequest('DELETE', server_url + api_url).then(
                    function(res) {
                        res.getStatus = true;
                        callback(res);
                    }, function(res) {
                        res.getStatus = false;
                        callback(res);
                    }
                );
            }

            self.addWithdrawalAddress = function (data, callback) {
                var api_url = 'api/private/btc-withdrawal-address-book/';

                api_sender.sendApiRequest('POST', server_url + api_url, data).then(
                    function(res) {
                        res.getStatus = true;
                        callback(res);
                    }, function(res) {
                        res.getStatus = false;
                        callback(res);
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
                        res.getStatus = true;
                        callback(res);
                    }, function(res) {
                        res.getStatus = false;
                        callback(res);
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

        // get btc-wallet-transactions
            self.GetBTCWalletTransaction = function (callback) {
                var api_url = 'api/private/btc-wallet-transactions/';
                
                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }    
                );
            }

            self.GetBTCWalletTransactionWithPage = function(page, callback) {
                var api_url = 'api/private/btc-wallet-transactions/';

                api_sender.sendApiRequest('GET', server_url + api_url + '?page=' + page).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

        // get orders
            self.GetOrders = function (callback) {
                var api_url = 'api/private/orders/?status=20';

                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            };

            self.AddOrder = function (item, callback) {
                var api_url = 'api/private/orders/?status=20';

                api_sender.sendApiRequest('POST', server_url + api_url, item).then(
                    function(res) {
                        res.res_status = true;
                        callback(res);
                    }, function(res) {
                        res.res_status = false;
                        callback(res);
                    }
                );
            };

            self.GetOrdersWithPage = function(page, callback) {
                var api_url = 'api/private/orders/?status=20';

                api_sender.sendApiRequest('GET', server_url + api_url + '?page=' + page).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }

            self.DeleteOrderWithId = function(id, callback) {
                var api_url = 'api/private/orders/'+ id + '/';

                api_sender.sendApiRequest('DELETE', server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    }, function(res) {
                        callback(false);
                    }
                );
            }
        /// sell btc page
            // get orderbook
            self.GetOrderBook = function(callback) {
                var api_url = 'api/public/orderbook/btc-aud/asks/';
                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        res.res_status = true;
                        callback(res);
                    }, function(res) {
                        res.res_status = false;
                        callback(res);
                    }
                );  
            }

            // get profile
            self.GetProfile = function(callback) {
                var api_url = 'api/private/profile/';
                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        res.res_status = true;
                        callback(res);
                    }, function(res) {
                        res.res_status = false;
                        callback(res);
                    }
                );  
            }

            // get btc-aud bids
            self.GetBABids = function(callback) {
                var api_url = 'api/public/orderbook/btc-aud/bids/';
                api_sender.sendApiRequest('GET', server_url + api_url).then(
                    function(res) {
                        res.res_status = true;
                        callback(res);
                    }, function(res) {
                        res.res_status = false;
                        callback(res);
                    }
                );                  
            }
        }
    ])
;