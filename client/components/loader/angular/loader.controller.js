(function() {
    'use strict';

    angular
        .module('loaderComponentModule')
        .controller("loaderController", loaderController);

    loaderController.$inject = [
        "$scope",
        "$element"
    ];

    function loaderController(
        $scope,
        $element
    ){
        $scope.animate = true;

        $scope.handleClick = function(event){
            $scope.animate = !$scope.animate;
        };
    }
})();