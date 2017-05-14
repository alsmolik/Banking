app.controller('newTransferController', function ($scope, $rootScope, transfersService, cardsService, toaster) {
    cardsService.getCards()
        .then(response => {
            $scope.cards = response.data;
        })
        .catch(errResponse => $rootScope.app.handleError(errResponse.data));

    $scope.getCardBalance = function (cardId) {
        if (!cardId) return 0;

        return $scope.cards.find(card => card.id == cardId).balance;
    };
    
    $scope.create = function () {
        transfersService.create($scope.newTransfer)
            .then(() => toaster.pop('success', 'Перевод успешно выполнен'))
            .catch(errResponse => $rootScope.app.handleError(errResponse.data));
    };
});