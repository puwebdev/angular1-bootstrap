
angular.module('app')
    .service('api_sender' , [
        '$http',
        '$cookies',
        function($http,$cookies) {

            var self = this;
            var access_token = '';            

            self.sendApiRequest_url_encoded = function (httpMethod , ApiMethod , data){

                access_token = $cookies.get('access_token');

                if (access_token) {
                    access_token = 'token ' + access_token;
                }   else    {
                    access_token = '';
                }

                var request = {
                    method : httpMethod,
                    url : ApiMethod ,
                    data : data ,
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },                    
                    headers : {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : access_token
                    }
                }
                return $http(request);
            };

            self.sendApiRequest = function sendApiRequest(httpMethod , ApiMethod , data){

                access_token = $cookies.get('access_token');

                if (access_token) {
                    access_token = 'token ' + access_token;
                }   else    {
                    access_token = '';
                }

                var request = {
                    method : httpMethod,
                    url : ApiMethod ,
                    data : data ,
                    headers : {
                        'Authorization' : access_token
                    }
                }
                return $http(request);
            };

        }
    ]);

//     .service('private_apis' , [
//         'api_sender',
//         function(api_sender) {

//             var self = this;

//             var server_url = 'http://13.75.147.191/';

//         // get order list
//             self.GetOrderList = function (count , callback) {

//                 var api_url = 'api/private/orders/?page_size=' + count;

//                 api_sender.sendApiRequest('GET' , server_url + api_url).then(
//                     function(res) {
//                         callback(res.data);
//                     },
//                     function(res) {
//                         callback(false);
//                     }
//                 );
//             };
//             self.GetOrderPage = function (page_num , callback) {
                
//                 var api_url = 'api/private/orders/'
                
//                 if (page_num > 1) {
//                     api_url = api_url + '?page=' + page_num;
//                 }

//                 api_sender.sendApiRequest('GET' , server_url + api_url).then(
//                     function(res) {
//                         callback(res.data);
//                     },
//                     function(res) {
//                         callback(false);
//                     }
//                 );
//             };
//         // get open orders
//             self.GetOpenOrder = function (callback) {
            
//                 var api_url = 'api/private/orders/?page_size=100&status=20';

//                 api_sender.sendApiRequest('GET' , server_url + api_url).then(
//                     function(res){
//                         callback(res.data);
//                     },
//                     function(res){
//                         console.log(res);
//                         callback(false);
//                     }
//                 );
//             };
//             self.GetOpenOrderPage = function(page , callback) {

//                 var api_url = 'api/private/orders/?page=' + page + '?status=20';

//                 api_sender.sendApiRequest('GET' , server_url + api_url).then(
//                     function(res) {
//                         callback(res.data);
//                     },
//                     function(res) {
//                         console.log(res);
//                         callback(false);
//                     }
//                 );
//             };
//         // get user balance
//             self.GetUserBalance = function (callback) {

//                 var api_url = 'api/private/balances';

//                 api_sender.sendApiRequest('GET' , server_url + api_url).then(
//                     function(res) {
//                         callback(res.data);
//                     },
//                     function(res) {
//                         callback(false);
//                     }
//                 );
//             };
//         // get trades list
//             self.GetTradesList = function (count , callback) {

//                 var api_url = 'api/private/trades/?page_size=' + count;

//                 api_sender.sendApiRequest('GET' , server_url + api_url).then(
//                     function(res) {
//                         callback(res.data);
//                     },
//                     function(res) {
//                         callback(false);
//                     }
//                 );
//             };
//         // get aud bank acc
//             self.GetAudBankAcc = function (callback) {

//                 var api_url = 'api/private/aud-bank-accounts/';

//                 api_sender.sendApiRequest('GET' , server_url + api_url).then(
//                     function(res) {
//                         callback(res.data);
//                     }, 
//                     function(res) {
//                         callback(false);
//                     }
//                 );

//             }
//         // post order
//             self.MakeOrder = function (direction , price , amount , callback) {

//                 var api_url = 'api/private/orders/';

//                 api_sender.sendApiRequest('POST' , server_url + api_url , {
//                     direction : direction ,
//                     amount : amount ,
//                     price : price , 
//                 }).then(
//                     function(res) {
//                         callback(res.data);
//                     },
//                     function(res) {
//                         console.log(res);
//                         callback(false);
//                     }
//                 );
//             };
//         // post aud withdraw
//             self.MakeAudWithdraw = function(amount , bank_acc_id , callback) {

//                 var api_url = 'api/private/aud-withdrawals/';
//                 var bank_acc_url = 'api/private/aud-bank-accounts/';

//                 api_sender.sendApiRequest('POST' , server_url + api_url , {
//                     amount : amount ,
//                     bank_account : server_url + bank_acc_url + bank_acc_id + '/'
//                 }).then(
//                     function(res) {
//                         callback(res.data);
//                     },
//                     function(res) {
//                         console.log(res);
//                         callback(false);
//                     }
//                 );

//             };
//         // get deposit aud
//             self.GetDepositAud = function(callback) {

//                 var api_url = 'api/private/aud-deposits/';

//                 api_sender.sendApiRequest('GET' , server_url + api_url).then(
//                     function(res) {
//                         callback(res.data);
//                     }, 
//                     function(res) {
//                         console.log(res);
//                         callback(false);
//                     }
//                 );
//             };
//         // get deposit btc
//             self.GetDepositBtc = function(callback) {

//                 var api_url = 'api/private/btc-deposits/';

//                 api_sender.sendApiRequest('GET' , server_url + api_url).then(
//                     function(res) {
//                         callback(res.data);
//                     },
//                     function(res) {
//                         console.log(res);
//                         callback(false);
//                     }
//                 );
//             }

//         }
//     ])
