app.service('cardsService', function ($http, $rootScope) {
    this.create = function (card) {
        return $http.post('api/cards', card);
    };

    this.getCards = function () {
        return $http.get('api/users/' + $rootScope.app.userData.id + '/cards');
    };
    
    this.list = function (limit, offset) {
        return $http.get('api/users/' + $rootScope.app.userData.id + '/cards/list?limit=' + limit + '&offset=' + offset);
    };

    this.delete = function (id) {
        return $http.delete('api/cards/' + id);
    };
});