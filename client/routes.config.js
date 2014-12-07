(function() {
    'use strict';

    angular
        .module('Client')
        .config(config);

    config.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function config(
        $stateProvider,
        $urlRouterProvider,
        $locationProvider
    ){
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "partials/view-home.partial.html"
            })
            .state('loader', {
                url: "/loader",
                templateUrl: "partials/view-loader.partial.html"
            });
    }
})();