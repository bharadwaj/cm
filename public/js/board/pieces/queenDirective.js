mainNgApp.directive('myBlackQueen', ['$document', 'mySocket', function( $document, mySocket) {
  return {
    restrict: 'EA',
    link: function(scope, element, attr) {

      var startX = 0, startY = 0, x = 0, y = 0;

      scope.moveQueen = function(x_to_set, y_to_set){

        scope.m = x_to_set
        scope.n = y_to_set
        x = x_to_set
        y = y_to_set

        makeMove()
        mySocket.emit('b_queen_location', location)

      }

      element.css({
       position: 'relative',
       border: '1px solid green',
       backgroundColor: 'lightgrey',
       cursor: 'pointer'
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);

      });

      scope.testChange = function(){
        console.log("triggered: "+ scope.m)
        
        element.css({
          top: scope.n + 'px',
          left:  scope.m + 'px'          
        })

        x = scope.m
        y = scope.n

        var location = {
            peice : "b_queen",
            x_coord : x,
            y_coord : y
        }
        mySocket.emit('b_queen_location', location)
        

        makeMove()
      }

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;

        

        scope.$apply(function(){
          scope.m = x
          scope.n = y
        })

        makeMove()
        
      }

      function makeMove(){

        element.css({
          top: scope.m + 'px',
          left:  scope.n + 'px'
        });

      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);

        console.log("from mu x",x)
        console.log("from mu y",y)
        var location = {
            peice : "b_queen",
            x_coord : x,
            y_coord : y
        }
        mySocket.emit('b_queen_location', location)
      }

    }
  };
}]);
