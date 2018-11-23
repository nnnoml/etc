  var body = document.getElementsByTagName('body');

  var scroll_timer = ''; //定时器
  var scroll_send_x = 0; //上次发送的X坐标
  var scroll_send_y = 0; //上次发送的Y坐标

  window.onscroll = function() {

    var scrollTop = window.pageYOffset  //用于FF
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;

    var scrollLeft = window.pageXOffset  //用于FF
                || document.documentElement.scrollLeft  
                || document.body.scrollLeft
                || 0;
    ajaxGet(0,'scroll top:'+scrollTop+' left:'+scrollLeft);
  }

  window.onresize = function(){
    //TODO
  }