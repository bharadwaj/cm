var mainNgApp = angular.module("mainNgApp", ['ngRoute', 'timer', 'btford.socket-io']);


mainNgApp.factory('mySocket', function (socketFactory) {
  return socketFactory();
})


mainNgApp.controller("gameUserCtrl", function($scope, $http, mySocket) {

    $scope.m = 0
    $scope.n = 0
    //console.log("From Game Controller: "+ $scope.eX)

    

    mySocket.on('b_rook_location', function(loc){
            console.log("x of rook from server: "+ loc.x_coord)
            console.log("y of rook from server: "+ loc.y_coord)
            $scope.resetElement(loc.x_coord, loc.y_coord)
        })

    mySocket.on('b_queen_location', function(loc){

            console.log("x of queen from server: "+ loc.x_coord)
            console.log("y of queen from server: "+ loc.y_coord)
            
            
            $scope.moveQueen(loc.x_coord, loc.y_coord)
        })

    $scope.showValues = function(){
        console.log("x from gameCtrl: "+ $scope.eX)
        console.log("Y from gameCtrl: "+ $scope.eY)
        $scope.resetElement(0, 0)
        $scope.moveQueen(0, 0)
    }

});


mainNgApp.controller("gameFooterCtrl", function($scope) {
    $scope.userId = "Sample User2";
    $scope.pwd = "Sample Pwd2";
});
