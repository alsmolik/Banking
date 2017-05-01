app.run(function ($rootScope, $http, toaster, $cookieStore) {
    $rootScope.app = {};

    if ($cookieStore.get('token') != undefined) {
        $http.get('api/user/data')
            .then(response => {
                $rootScope.app.userData = response.data;
            });
    }

    $rootScope.app.handleError = function (err) {
        if (err.errors) {
            err.errors.forEach(error => {
                toaster.pop('error', error.message || 'Произошла ошибка');
            });
        } else {
            toaster.pop({
                type: 'error',
                title: err.message || 'Произошла ошибка'
            });
        }
    };
})
;