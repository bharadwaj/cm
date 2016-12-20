mainNgApp.directive('myDraggable', ['$document', 'mySocket', function( $document, mySocket) {
  return {
    restrict: 'EA',
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      

      scope.resetElement = function(x_to_set, y_to_set){

        startX = x_to_set - x
        startY = y_to_set - y

        console.log("I called reset Element")

        element.css({
          top: y_to_set + 'px',
          left:  x_to_set + 'px'
        });        
      }

      element.css({
       position: 'relative',
       border: '1px solid red',
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

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;

        scope.m = x
        scope.n = y

        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);

        scope.eX = x
        scope.eY = y

        console.log("from mu x",x)
        console.log("from mu y",y)
        var location = {
            peice : "rook",
            x_coord : x,
            y_coord : y
        }
        mySocket.emit('b_rook_location', location)
      }

    }
  };
}]);