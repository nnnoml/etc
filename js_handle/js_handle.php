<?php
	$info = $_GET['data'];

    file_put_contents('./js_handle.log',$info.PHP_EOL, FILE_APPEND);
