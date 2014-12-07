(function() {
    'use strict';

    angular
        .module('navigationComponentModule')
        .controller("navigationController", navigationController);

    navigationController.$inject = [
        "$scope",
        "$element"
    ];

    function navigationController(
        $scope,
        $element
    ){}
})();