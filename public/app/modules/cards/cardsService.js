app.service('cardsService', function ($http, $rootScope) {
    this.create = function (card) {
        return $http.post('api/cards', card);
    };

    this.list = function (limit, offset) {
        return $http.get('api/users/' + $rootScope.app.userData.id + '/cards?limit=' + limit + '&offset=' + offset);
    };

    this.delete = function (id) {
        return $http.put('api/cards/' + id);
    };
});