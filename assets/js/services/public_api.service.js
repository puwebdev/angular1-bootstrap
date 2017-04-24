
angular.module('app')
    .service('public_apis' , [
        'api_sender',
        function(api_sender) {

            var self = this;

            var server_url = 'https://webapp.digitalsurge.io/';
        // get bids list
            self.GetBidsList = function (count , callback) {
                
                var api_url = 'api/public/orderbook/btc-aud/bids/?page_size=' + count;

                api_sender.sendApiRequest('GET' , server_url + api_url).then(
                    function(res) {   
                        callback(res.data);  
                    },
                    function(res) {
                        callback(false);
                    }
                );                                 
            };
        // get asks list
            self.GetAsksList = function (count , callback) {
                
                var api_url = 'api/public/orderbook/btc-aud/asks/?page_size=' + count;

                api_sender.sendApiRequest('GET' , server_url + api_url).then(
                    function(res) {   
                        callback(res.data);  
                    },
                    function(res) {
                        callback(false);
                    }
                );                                 
            };
        // get trades history
            self.GetTradesHistory = function (count , callback) {

                var api_url = 'api/public/trades-history/?page_size=' + count;

                api_sender.sendApiRequest('GET' , server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    },
                    function(res) {
                        callback(false);
                    }
                );
            };
        }
    ])
;