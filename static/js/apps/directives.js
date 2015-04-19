angular.module('directives', [])
.directive('scroller', function () {
  return {
    restrict: 'A',
    scope: false,
    link: function (scope, elem, attrs) {
      rawElement = elem[0];
      elem.bind('scroll', function () {
        // alert('?');
        var checkBottom = function(){

        };
        // if( scope.momentsList.length !=0 && (rawElement.scrollTop + rawElement.offsetHeight) >= rawElement.scrollHeight ){
        if( (rawElement.scrollTop + rawElement.offsetHeight) >= rawElement.scrollHeight ){
         // elem.append('<div id="loading">正在加载...</div>');
          console.log("scrollTop: "+rawElement.scrollTop +", offsetHeight: " + rawElement.offsetHeight +", scrollHeight: " +rawElement.scrollHeight);
//          scope.loadingView = true;
          scope.$apply('loadMore()'); //new
        }
      });
    }
  };
})
.directive('max-height', function ($window) {

    return {
        restrict: 'A',

        link: function (scope, elem, attrs) {

            var winHeight = $window.innerHeight;

            var headerHeight = attrs.banner ? attrs.banner : 40;

            elem.css('max-height', winHeight - headerHeight + 'px');
        }
    };
});
;