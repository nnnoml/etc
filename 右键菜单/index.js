	var clickE = '';

	addCss();
	addHtml();

	window.oncontextmenu=function(e){
		e.preventDefault();
		e = e||envent;
			clickE = e.srcElement ||e.target;
		var menu=document.querySelector("#menu");
		menu.style.left=e.clientX+'px';
		menu.style.top=getScrollTop()+e.clientY+'px';
		menu.style.width='125px';
		menu.style.display="block";
	}

	window.onclick=function(e){
		document.querySelector('#menu').style.display="none";
	}

	function leeeHideDom(){
		clickE.style.display='none';
	}

	function leeeRemoveDom(){
		clickE.remove();
	}

	function getScrollTop() {
	    var scroll_top = 0;
	    if (document.documentElement && document.documentElement.scrollTop) {
	        scroll_top = document.documentElement.scrollTop;
	    }
	    else if (document.body) {
	        scroll_top = document.body.scrollTop;
	    }
	    return scroll_top;
	}
	function addCss(){
		var style = document.createElement("style");
		style.type = "text/css";
		style.appendChild(document.createTextNode("#menu{width: 0;overflow: hidden;box-shadow: 0 1px 1px #888,1px 0 1px #ccc;position: absolute;z-index: 99999999;background:#fff;border:1px solid #888;}.menu{width: 130px;height: 25px;line-height: 25px;padding: 0 10px;}.menu:hover{background-color:#ccc;}"));
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(style);
	}


	//创建DIV 
	function addHtml(){
		var dom = document.body; 
		var div = document.createElement("div"); 
		div.id = 'menu';

		var div2 = document.createElement("div");
		div2.innerHTML = '<div class="menu" onClick="leeeHideDom()">隐藏</div><div class="menu" onClick="leeeRemoveDom()">删除</div>'; 
		div.appendChild(div2)
		dom.appendChild(div);
	}
