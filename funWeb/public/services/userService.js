let _$http;
let _users;

class userService {
    constructor($http) {
        _$http = $http;
        _users = [];
    }

    addUser(userData) {
        const configObject = {
            method: 'POST',
            url: '/user',
            data: JSON.stringify(userData)
        };
        return _$http(configObject);
    }

    getUsers() {
        const configObject = {
            method: 'GET',
            url: '/user'
        };
        return _$http(configObject);
    }

    getUser(id) {
        const configObject = {
            method: 'GET',
            url: `/user/${id}`
        };
        return _$http(configObject);
    }

    deleteUser(id) {
        const promise = _$http({
                method: 'DELETE',
                url: '/user',
                data: { _id: id },
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
            });
        // Return the promise to the controller
        return promise;
    }

    updateUser(data) {
        const configObject = {
            method: 'PUT',
            url: '/user',
            data: JSON.stringify(data),
        };
        return _$http(configObject);
    }
}

userService.$inject = ['$http'];

angular.module('funWebApp').service('userService', userService);
