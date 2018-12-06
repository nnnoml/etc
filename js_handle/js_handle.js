//todo list 
//18.12.3 iframe 跨域无法解决 放弃
//18.12.4 iframe 如果注入的话 不存在跨域，循环给iframe加事件，但tag事件没加

if (typeof (qzl_js_handle_flag) == "undefined") {
    qzl_js_handle_flag = true;

    //-------------config-----------------
    var url = 'http://127.0.0.1:19001/';//提交地址
	  // var url_bak = 'https://v.qzl8.com/https/js_handle.php';//提交地址2
	  var url_bak = './js_handle.php';//提交地址2
    var component = ['mouse','scroll','keybord','tag','other']; //组件枚举
    var ajax_switch = true;  //提交开关
    var ob = []; //观察容器
    var iframe_PS = []; //iframe发布订阅
    //-------------config-----------------

    //-------------init 加载依赖-------------------
    function init(){
      //加载事件
      component.forEach(function(vo){
        var new_element = document.createElement("script");
          new_element.setAttribute("type", "text/javascript");
          // new_element.setAttribute("src", '//v.qzl8.com/https/'+vo+".js");
          new_element.setAttribute("src", './'+vo+".js");
          document.body.appendChild(new_element);
      })

      //页面加载完成，给所有iframe再加载一遍事件
      window.onload=function(){
        var f = window.frames;
        for (var f_num = 0; f_num < f.length; f_num += 1) {
          iframe_PS.forEach(function(item){
            addEvtListener(f[f_num], ""+item[0]+"",item[1])
          })
        }
      }

      //页面切换状态监控
      var hiddenProperty = 'hidden' in document ? 'hidden' :
          'webkitHidden' in document ? 'webkitHidden' :
          'mozHidden' in document ? 'mozHidden' :
          null;
      var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
      var onVisibilityChange = function(){
          if (!document[hiddenProperty]) {
            ajaxGet(0,'show_ie_title('+document.title+');');
          }else{
            // console.log('页面非激活')
          }
      }
      document.addEventListener(visibilityChangeEvent, onVisibilityChange);

    }

    //-------------init-------------------

    //监听keybord
    //公共方法
    function ajaxGet(is_close,info,callback){
      if(ajax_switch){
        info = encodeURIComponent(info)
        var ajax = new XMLHttpRequest();
        if(is_close == 1){
          ajax.open('get',url+'webDataEnd');
        }
        else{
          ajax.open('get',url+'webData?data='+info);
        }
        ajax.send();
        //备份数据
        ajax.open('get',url_bak+'?data='+info);
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
    function stopPropagation(e){
      var e = window.event || e;
      // this code is for Mozilla and Opera 
      if (e.stopPropagation) {
          e.stopPropagation();
      }
      // this code is for IE 
      else {
          e.cancelBubble = true;
      }
    }

    //通知所有ob
    function NoticeOB(){
      ob.forEach(function(vo){
        if(typeof(vo) != 'undefined'){
            eval(vo)();
        }
      })
    }

    //添加监听事件
    function addEvtListener(dom,type,func) {
      if (document.addEventListener) {
          if (dom) {
              dom.addEventListener(type, func, false)
          } else {
              addEventListener(type, func, false)
          }
      } else {
          if (attachEvent) {
              if (dom) {
                  dom.attachEvent("on" + type, func)
              } else {
                  attachEvent("on" + type, func)
              }
          }
      }
    }

    //递归查询dom结构
    var level = 0;
    var level_arr = [];
    function tagLevel(thi){
      var par = thi.parentNode;
      var ps = thi.previousElementSibling;

      //同级上一个不为空 继续往上找
      if(ps != null){
        level += 1;
        tagLevel(ps);
      }
      //同级找到最顶，往上找父级
      else{
        //一旦触发找父级 存一次
        level_arr.push(level);
        level = 0;
        //父级没到body 在此级往上找同级
        if(par.nodeName != 'BODY'){
          tagLevel(par);
        }
        else{
          level_arr.reverse();
        }
      }
      return level_arr;
    }

    init();
}