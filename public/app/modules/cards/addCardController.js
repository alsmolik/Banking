app.controller('addCardController', function ($rootScope, $scope, $state, cardsService, toaster) {
    $scope.card = {};

    $scope.add = function () {
        cardsService.create($scope.card)
            .then(() => {
                toaster.pop('success', 'Карта успешно добавлена');
                $state.go('cards');
            })
            .catch(errResponse => $rootScope.app.handleError(errResponse.data));
    };

    $scope.isValid = function () {
        if ($scope.card.number && $scope.card.name && $scope.card.expires && $scope.card.cvc) return true;

        return false;
    };
});