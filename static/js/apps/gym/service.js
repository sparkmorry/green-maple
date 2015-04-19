angular.module('gymApp.services',[])
.factory('gymService', function($http){
  var API = {};
  API.getgymListAPI = function(){ 
    var url = 'http://182.92.233.114:8080/Book/businesslist/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567?callback=JSON_CALLBACK';      
    var http = $http.jsonp(url); 
    return http;   
  };

  API.sendMsg = function(phone){
    var url = 'http://182.92.233.114:8080/Book/sendvfsms/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567/cname/'+phone+'?callback=JSON_CALLBACK';
    var http = $http.jsonp(url); 
    return http;  
  }

  API.login = function(phone, code){
    var url = 'http://182.92.233.114:8080/Book/book/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567/cname/'+phone+'/code/'+code+'?callback=JSON_CALLBACK';
    var http = $http.jsonp(url); 
    return http;  
  }

  API.getBusinessDetail = function(bid){
    var url = 'http://182.92.233.114:8080/Book/businessprofile/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567/bid/'+bid+'?callback=JSON_CALLBACK';
    var http = $http.jsonp(url); 
    return http; 
  }

  API.getBusinessPhone = function(bid){
    var url = 'http://182.92.233.114:8080/Book/getbtel/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567/bid/'+bid+'?callback=JSON_CALLBACK';
    var http = $http.jsonp(url); 
    return http;     
  }

  API.getPayByAli = function(bid, cid, bname, cname, tid){
    var url = 'http://182.92.233.114:8080/Book/order/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567/bid/'+bid+'/cid/'+cid+'/bname/'+bname+'/cname/'+cname+'/pay_type/alipay/tid/'+tid+'?callback=JSON_CALLBACK';
    console.log(url);
    // var test = 'http://182.92.233.114:8080/Book/order/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567/bid/1/cid/1/bname/test/cname/18665931075/pay_type/alipay/tid/2324?callback=JSON_CALLBACK';
    var http = $http.jsonp(url); 
    return http;     
  }

  API.getOrderList = function(cid){
    var url = 'http://182.92.233.114:8080/Book/ordershow/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567/cid/'+cid+'?callback=JSON_CALLBACK';
    // var test = 'http://182.92.233.114:8080/Book/ordershow/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567/cid/1?callback=JSON_CALLBACK';
    console.log(url)
    var http = $http.jsonp(url); 
    return http;  
  }

  API.getRestMoney = function(cid){
    var url = 'http://182.92.233.114:8080/Book/getbalence/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567/cid/'+cid+'?callback=JSON_CALLBACK'
    var http = $http.jsonp(url); 
    return http; 
  }

  API.getOrderDetail = function(id){
    var url = 'http://182.92.233.114:8080/Book/getdetail/token/d601b9d6a0c8652513b1e5faa80592d5/time/1234567/order_id/'+id+'?callback=JSON_CALLBACK'
    var http = $http.jsonp(url); 
    return http; 
  }

  return API;

})