<?php
	$info = $_GET['data'];
	$info = mb_convert_encoding($info,'utf-8');
	// $info = mb_detect_encoding($info);
    file_put_contents('./js_handle.log',$info.PHP_EOL, FILE_APPEND);
