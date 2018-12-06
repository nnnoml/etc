//监控input控件
// ob.push('getTagVal');
//setInterval('tt()',1000);

//input 点击事件
var tags = document.getElementsByTagName('input');
for (var i = 0; i < tags.length; i++) {
	addEvtListener(tags[i],'click',inputClick);
}
function inputClick(e) {
	var self = this;
	setTimeout(function(){
		level = 0;
		level_arr = [];
		var get_level = tagLevel(self);
	    // ajaxGet(0,'click_input_dom '+get_level.join(',')+' this value='+self.value);
        ajaxGet(0,'click_tag_mouse("'+get_level.join(',')+'");input_text("'+self.value+'");');
	},300);
	stopPropagation(e);
}

//textarea 点击事件
var tags = document.getElementsByTagName('textarea');
for (var i = 0; i < tags.length; i++) {
	addEvtListener(tags[i],'click',textareaClick);
}
function textareaClick(e) {
	var self = this;
	setTimeout(function(){
		level = 0;
		level_arr = [];
		var get_level = tagLevel(self);
	    // ajaxGet(0,'click_textarea_dom '+get_level.join(',')+' this value='+self.value);
        ajaxGet(0,'click_tag_mouse("'+get_level.join(',')+'");input_text("'+self.value+'");');
	},300);
	stopPropagation(e);
}

//select选择事件
var tags = document.getElementsByTagName('select');
for (var i = 0; i < tags.length; i++) {
	addEvtListener(tags[i],'change',selectClick);
}
function selectClick(e) {
	var self = this;
	setTimeout(function(){
		level = 0;
		level_arr = [];
		var get_level = tagLevel(self);

		var index = self.selectedIndex; // 选中索引
		var text = self.options[index].text; // 选中文本
		var value = self.options[index].value; // 选中值

	    // ajaxGet(0,'click_select_dom '+get_level.join(',')+' this value='+value);
	    
        ajaxGet(0,'click_tag_mouse("'+get_level.join(',')+'");input_text("'+self.value+'");');
	},300);
	stopPropagation(e);
}