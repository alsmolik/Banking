const app = angular.module('BankingApp', ['ui.router', 'ngCookies', 'toaster']);

app.factory('myHttpInterceptor', function ($q, $location, toaster) {
    return {
        response: function (response) {
            return response;
        },
        responseError: function (response) {
            if(response.status == 401){
                $location.url('/auth'); // TODO
                toaster.pop({type: 'error', body: 'AUTH ERROR'});

                //return $q.reject(response);
            }

            return $q.reject(response);
        }
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
});

app.config(function ($httpProvider, $httpParamSerializerJQLikeProvider) {
    $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get());
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer 123';
});