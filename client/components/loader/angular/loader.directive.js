(function() {
    'use strict';

    angular
        .module('loaderComponentModule')
        .directive("loader", loaderDirective);

    function loaderDirective(){
        var definition = {
            scope: {},
            controller: "loaderController",
            templateUrl: "partials/loader.partial.html",
            replace: true
        };
        return definition;
    }
})();