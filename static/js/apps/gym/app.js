var gymApp = angular.module('gymApp', [
  'ngRoute',
  'MessageCenterModule',
  'gymApp.services',
  'gymApp.controllers'
]);

gymApp.config(function($routeProvider, $httpProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'static/tpl/gym-list.html',
    controller: 'gymController'
  })
  .when('/detail/:bid/:bname', {
    templateUrl: 'static/tpl/detail.html',
    controller: 'detailController'
  })
  .when('/login/:bid/:bname/:tid', {
    templateUrl: 'static/tpl/bind.html',
    controller: 'loginController'
  })
  .when('/pay/:bid/:bname/:cname/:tid', {
    templateUrl: 'static/tpl/pay.html',
    controller: 'payController'
  })
  .when('/order', {
    templateUrl: 'static/tpl/order-list.html',
    controller: 'orderController'
  })
  .when('/order/:orderId', {
    templateUrl: 'static/tpl/order.html',
    controller: 'orderDetailController'
  })

});

gymApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
gymApp.directive('compileTemplate', function($compile, $parse){
    return {
        link: function(scope, element, attr){
            var parsed = $parse(attr.ngBindHtml);
            function getStringValue() { return (parsed(scope) || '').toString(); }
            
            //Recompile if the template changes
            scope.$watch(getStringValue, function() {
                $compile(element, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
            });
        }         
    }
});