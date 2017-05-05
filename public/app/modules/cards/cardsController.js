app.controller('cardsController', function ($scope, $rootScope, NgTableParams, cardsService, SweetAlert) {
    $scope.tableParams = new NgTableParams({
        page: 1,
        count: 10
    }, {
        getData: function ($defer, params) {
            cardsService.list(params.count(), (params.page() - 1) * params.count())
                .then(response => {
                    params.total(response.data.count);
                    $defer.resolve(response.data.rows);
                })
                .catch(errResponse => $rootScope.app.handleError(errResponse.data));
        }
    });

    $scope.deleteCard = function (id) {
        SweetAlert.swal({
            title: "Внимание!",
            text: "Вы действительно хотите удалить карту?",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "Отмена",
            closeOnConfirm: false
        }, function (result) {
            if (result)
                cardsService.delete(id)
                    .then(() => {
                        swal("Готово!", "Карта успешно удалена.", "success");
                        $scope.tableParams.reload();
                    })
                    .catch(errResponse => $rootScope.app.handleError(errResponse.data));
        });
    };
});