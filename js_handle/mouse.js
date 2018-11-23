  var body = document.getElementsByTagName('body');

  var mouse_timer = ''; //定时器
  var mouse_send_x = 0; //上次发送的X坐标
  var mouse_send_y = 0; //上次发送的Y坐标

//--监听mouse click
  body[0].addEventListener('click', mouseWatchClick, false);
  function mouseWatchClick() {
    var e = window.event || event;
    // console.log('click','x',e.clientX,'y',e.clientY);
    ajaxGet(0,'click x:'+e.clientX+' y:'+e.clientY);
    stopPropagation();
  }

//--监听mouse move
  body[0].addEventListener('mousemove', mouseWatchMove, false);
  function mouseWatchMove() {
    var e = window.event || event;
    let x = e.clientX;
    let y = e.clientY;
    // console.log('x',e.clientX,'y',e.clientY);
    stopPropagation();
    mouseTimer(x,y);
  }

  //定时器 判断move的开始和结束，1秒钟延迟
  function mouseTimer(x,y){
    clearInterval(mouse_timer);
    mouse_timer = setInterval(function(){
      if(x!= mouse_send_x || y != mouse_send_y){
        mouse_send_x = x;
        mouse_send_y = y;
        ajaxGet(0,'move x:'+x+' y:'+y,'mouseAjaxRes');
      }
    },1000);
  }