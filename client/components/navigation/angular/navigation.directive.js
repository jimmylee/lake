(function() {
    'use strict';

    angular
        .module('navigationComponentModule')
        .directive("navigation", navigationDirective);

    function navigationDirective(){
        var definition = {
            scope: {},
            controller: "navigationController",
            templateUrl: "partials/navigation.partial.html",
            replace: true
        };
        return definition;
    }
})();