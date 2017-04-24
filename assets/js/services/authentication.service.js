angular.module('app')
    .service('authentication' , [
    	'$cookies',
        'api_sender',
        function($cookies , api_sender) {
            var self = this;

         // login api 
            self.Login = function (username , password , callback) {
                var api_url = 'https://webapp.digitalsurge.io/auth/login/';
                api_sender.sendApiRequest('POST' , api_url , {username : username , password : password}).then(
                    function(response) {
                        $cookies.put('access_token' , response.data.key);                        
                        $cookies.put('username', username);
                        callback(true);
                    } , function(response) {
                        console.log(response);
                        callback(false);
                    }
                );
            };
        // logout api
            self.Logout = function (callback) {
                var api_url = 'http://13.75.147.191/auth/logout/';                  
                $cookies.put('username', "");
                api_sender.sendApiRequest('POST' , api_url).then(
                    function(response) {
                        $cookies.remove('access_token');
                        callback(true);
                    } , function(response) {
                        console.log(response);
                        callback(false);
                    }
                )
            };
        // authorization check
            self.isAuthenticated = function (){
                return $cookies.get('access_token') ? true : false;
            };

        // convert facebook OAuth token
            self.ConvertToken = function(OAuth_token, callback) {
                var api_url = 'https://webapp.digitalsurge.io/o/convert-token';

                var data = {
                    grant_type: 'convert_token',
                    client_id: 'yI3rweiBnhfuBb1xI0K6ecisBbmW5yCy71td2USx',
                    // client_secret: 'utx1Bfm5W6h1TlFXqhQJ6LaepCQCrx7kQyRPV92joWcbywvVhyq6zNjsmXp1bBYIKsEe2xMNFZkuK9aGtmHoCJdaF5hEWGsAE73l2L7C6Q9WRl0XnMKNoWPdENawfc5C',
                    backend: 'facebook',
                    token: OAuth_token
                };

                api_sender.sendApiRequest('POST', api_url, data).then(
                    function(response) {
                        console.log(response);
                        $cookies.put('access_token', response.data.access_token);                        
                        callback(true);
                    }, function(response) {
                        console.log(response);
                        callback(false);
                    }
                );
            };

        // oauth in backend side - get user info from facebook
            // self.Login = function(username, password, callback) {
            //     var api_url = 'https://webapp.digitalsurge.io/o/token';

            //     var data = {
            //         grant_type: 'password',                    
            //         client_id: 'yI3rweiBnhfuBb1xI0K6ecisBbmW5yCy71td2USx',
            //         // client_secret: 'utx1Bfm5W6h1TlFXqhQJ6LaepCQCrx7kQyRPV92joWcbywvVhyq6zNjsmXp1bBYIKsEe2xMNFZkuK9aGtmHoCJdaF5hEWGsAE73l2L7C6Q9WRl0XnMKNoWPdENawfc5C',
            //         username: username,
            //         password: password
            //     };

            //     api_sender.sendApiRequest_url_encoded('POST', api_url, data).then(
            //         function(response){
            //             $cookies.put('access_token', response.data.access_token);
            //             callback(true);
            //         }, function(response){
            //             console.log(response);
            //             callback(false);
            //         }
            //     );
            // };
        }
    ]);