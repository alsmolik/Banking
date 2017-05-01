const app = angular.module('BankingApp', ['ui.router', 'ngCookies', 'toaster', 'ui.card', 'ngTable', 'oitozero.ngSweetAlert']);

app.factory('myHttpInterceptor', function ($q, $location, toaster, $cookieStore) {
    return {
        request: function (request) {
            request.headers['Authorization'] = 'Bearer ' + $cookieStore.get('token');

            return request;
        },
        response: function (response) {
            return response;
        },
        responseError: function (response) {
            if (response.status == 401) {
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
});