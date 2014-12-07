(function() {
    'use strict';

    angular
        .module('serviceComponentModule')
        .factory("Service", service);

    function service() {
        var definition = {};

        definition.randomNumberToMax = function(max){
            return Math.floor(Math.random() * (max + 1)) + 0;
        };

        return definition;
    }
})();