  var body = document.getElementsByTagName('body');

  var mouse_timer = ''; //定时器
  var mouse_send_x = 0; //上次发送的X坐标
  var mouse_send_y = 0; //上次发送的Y坐标

//--监听mouse click
  addEvtListener(body[0],'click',mouseWatchClick);
  iframe_PS.push(['click',mouseWatchClick]);

  function mouseWatchClick(e) {
    var e = window.event || e;
    let x = e.clientX;
    let y = e.clientY;
    // ajaxGet(0,'click x:'+e.clientX+' y:'+e.clientY);
    //2345有一个定时器一直在点击body的00位置
    if(x!= mouse_send_x || y != mouse_send_y){
        mouse_send_x = x;
        mouse_send_y = y;
        ajaxGet(0,'click_rect("rect('+e.clientX+','+e.clientY+',1,1");');
      }
    stopPropagation(e);
  }


//--监听mouse move
  addEvtListener(body[0],'mousemove',mouseWatchMove);
  iframe_PS.push(['mousemove',mouseWatchMove]);


  function mouseWatchMove(e) {
    var e = window.event || e;
    let x = e.clientX;
    let y = e.clientY;
    // console.log('x',e.clientX,'y',e.clientY);
    stopPropagation(e);
    mouseTimer(x,y);
  }

  //定时器 判断move的开始和结束，1秒钟延迟
  function mouseTimer(x,y){
    clearInterval(mouse_timer);
    mouse_timer = setInterval(function(){
      if(x!= mouse_send_x || y != mouse_send_y){
        mouse_send_x = x;
        mouse_send_y = y;
        // ajaxGet(0,'move x:'+x+' y:'+y);
        ajaxGet(0,'mouse_move(0,0,'+x+','+y+');');
      }
    },100);
  }