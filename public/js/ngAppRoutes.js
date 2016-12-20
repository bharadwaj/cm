mainNgApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/play', {
            templateUrl: 'templates/game-board.html',
            controller: 'gameUserCtrl'
        })
        .when('/profile', {
            templateUrl: 'templates/user-account-profile-tmpl.html',
            controller: 'gameUserCtrl'
        })
        
    $locationProvider.html5Mode(true);

}]);