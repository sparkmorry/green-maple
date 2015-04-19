function countDownClick(jQdom, time, callback){
  this.jQbtn = $(jQdom);
  this.totalTime = time || 60;
  this.counting = 0;
  this.callback = callback;
};

countDownClick.prototype = {
  init: function(){
    var self = this;
    this.jQbtn.data('counting', '0');
    this.jQbtn.bind('click', function(){
      self.clickEvt(self);
    });
  },

  countDown: function(){
    this.counting = 1;
    this.jQbtn.addClass('btn-disable');

    var leftTime = this.totalTime;
    var timer;
    var self = this;
    function counter() {
      if(leftTime == 0){
        clearTimeout(timer);
      }else{
        leftTime--;
        self.setStatus(leftTime);      
      };
      timer = setTimeout(counter, 1000);
    };
    timer = setTimeout(counter, 1000);  
  },

  setStatus: function(leftTime){
    if (leftTime == 0) {
      this.reset();
      return;
    }
    var text = '获取验证码('+leftTime+')'
    this.jQbtn.text(text);
  },

  clickEvt: function(self){
    if(self.counting){
      return;
    }else{
      self.callback();
    }  
  },

  reset: function(){
    this.counting = 0;
    this.jQbtn.removeClass('btn-disable');
    this.jQbtn.text("获取验证码");
  }
}
