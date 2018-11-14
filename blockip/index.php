<?php
/**
* block ip
* 查询直接访问url
* set 追加type参数 eg:url?type=set
*/
class blockIp{
	public $txt_url = './ip.txt';//文本地址
	public $ip;
	public function __construct(){
		$type = $_GET['type'] ?? 'get';
		if($type != 'get'){
			$type = 'set';
		}
		//获取ip
		$this->ip = $this->getIp();
		//如果查询到ip,返回1
		if($this->search()){
			echo 1;
		}
		//如果没有查询到ip 返回0
		else{
			echo 0;
			//如果type是set 额外把该ip设置进库
			if($type == 'set'){
				$this->setIp();
			}
		}
	}
	
	public function search()
	{	
		if(!file_exists($this->txt_url)) {
			file_put_contents($this->txt_url,'',FILE_APPEND);
		}
		$myfile = fopen($this->txt_url, "r") or die("Unable to open file!");
		$txt = @fread($myfile,filesize($this->txt_url));
		$txt = $this->replaceBrToExplode($txt);
		$res = strpos($txt,ip2long($this->ip).'|');
		if($res!==false){
			return true;
		}
		else{
			return false;
		}
	}

	public function getIp(){
	    $ip=false;
	    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
	        $ip=$_SERVER['HTTP_CLIENT_IP'];
	    }
	    if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
	        $ips=explode (', ', $_SERVER['HTTP_X_FORWARDED_FOR']);
	        if($ip){ array_unshift($ips, $ip); $ip=FALSE; }
	        for ($i=0; $i < count($ips); $i++){
	            if(!eregi ('^(10│172.16│192.168).', $ips[$i])){
	                $ip=$ips[$i];
	                break;
	            }
	        }
	    }
	    return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
	}

	public function setIp(){
		file_put_contents($this->txt_url,ip2long($this->ip).PHP_EOL, FILE_APPEND);
	}

	public function replaceBrToExplode($str)
	{
	    $names = preg_split('/\r\n/',trim($str));
	    $return_str = "";
	    foreach($names as $name){
	        $return_str .= $name."|";
	    }
	    return $return_str;
	}
}

new blockIp();