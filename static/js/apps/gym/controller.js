angular.module('gymApp.controllers', [])
.controller('gymController', function ($scope, $http, $routeParams, gymService, messageCenterService) {

  gymService.getgymListAPI().success(function(ret){
    if(ret.code == 0){
      $scope.gymList = ret.data;
    }
  });

})
.controller('detailController', function ($scope, $http, $sce, $routeParams, gymService, messageCenterService) {
  var bid = $routeParams.bid;
  var bname = $routeParams.bname;
  $scope.bid = bid;
  $scope.bname = bname;

  gymService.getBusinessDetail(bid).success(function(ret){
    if(ret.code == 0){
      $scope.gymDetail= ret.data;
      //坑：虽然是对象，但是放到value里变string了！
      $scope.timeSelected = JSON.stringify(ret.data.book[0]);
      $scope.currentPrice = ret.data.book[0].price;
      $scope.currentTid = ret.data.book[0].tid;
      $scope.detailHtml = $sce.trustAsHtml(ret.data.bdescription);
    }
  });

  gymService.getBusinessPhone(bid).success(function(ret){
    if(ret.code == 0){
      console.log(ret.data);
      $scope.phone= ret.data.btel;
    }
  });

  $scope.changeTime= function(timeSelected) {
    var ts = JSON.parse(timeSelected);
    $scope.currentPrice = ts.price;
    $scope.currentTid = ts.tid;
  }

})
.controller('loginController', function ($scope, $timeout, $location, $routeParams, gymService) {
  var bid = $routeParams.bid;
  var bname = $routeParams.bname;
  var cname = '';
  var tid = $routeParams.tid;
  var isCounting = false;
  var totalTime = 60;
  // $('#J-verify-code').focus();

  $scope.sendMsg = function(){
    if(isCounting){
      return;
    }

    var phone = document.getElementById('J-phone-input').value;
    if(phone == ''){
      $scope.errMsg="手机号码不能为空";
      return;
    }else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phone))){
      $scope.errMsg = "手机号码格式不正确";
      return;
    }

    $scope.onTimeout = function(){
      if(totalTime>0){
        totalTime--;
        $scope.leftTime = '('+totalTime+')';
        $scope.disable = true; 
        isCounting = true;  
        mytimeout = $timeout($scope.onTimeout,1000); 
      }else{
        $scope.disable = false;
        $scope.leftTime = '';
        totalTime = 60;
        isCounting = false;
        $timeout.cancel(mytimeout);
      }
    }
    var mytimeout = $timeout($scope.onTimeout,1000);

    console.log("sendMsg!!!!!!!");
    $('#J-verify-code').focus();
    gymService.sendMsg(phone).success(function(ret){
      if(ret.code == 0){
        console.log(ret.msg);
      }
    });

  };

  $scope.verify = function(){
    var phone = document.getElementById('J-phone-input').value;
    var code = document.getElementById('J-verify-code').value;
    if(phone == ''){
      $scope.errMsg="手机号不能为空";
      return;
    }
    if(code == ''){
      $scope.errMsg="验证码不能为空";
      return;
    }
    cname = phone;
    gymService.login(phone, code).success(function(ret){
      if(ret.code == 0){
        $scope.errMsg='';
        console.log(ret.msg);
        var url = '/pay.html?bid='+bid+'&bname='+bname+'&cname='+cname+'&tid='+tid+'&cid='+ret.data.cid;
        // console.log(url)
        // $location.path(url);
        setCookie('cid', ret.data.cid);
        window.location.href = url;
      }else{
        $scope.errMsg=ret.msg;
      }
    });
  };  

})
.controller('orderController', function ($scope, $http, $location, $routeParams, gymService, messageCenterService) {
  var cid = getCookie('cid');
  $scope.money = '0';
  $scope.orders = [];
  if(cid == undefined || cid == ''){
    alert('请先登录');
    $location.path('/');
    jQgym.click();
    return;
  }

  gymService.getRestMoney(cid).success(function(ret){
    if(ret.code == 0){
      $scope.money = ret.data.balence;
    }else{
      // alert(ret.msg);
    }
  });

  gymService.getOrderList(cid).success(function(ret){
    if(ret.code == 0){
      $scope.orders = ret.data;
    }else{
      alert(ret.msg);
    }
  });

  $scope.statusMap = {
    '-1' : '未支付',
    '1' : '未使用',
    '2' : '已使用',
    '3' : '过期'
  }    

})
.controller('orderDetailController', function ($scope, $routeParams, gymService, messageCenterService) {
  var cid = getCookie('cid');
  var id = $routeParams.orderId;

  gymService.getOrderDetail(id).success(function(ret){
    if(ret.code == 0){
      $scope.order = ret.data;
    }else{
      alert(ret.msg);
    }
  });

  $scope.statusMap = {
    '-1' : '未支付',
    '1' : '未使用',
    '2' : '已使用',
    '3' : '过期'
  }    

})
;