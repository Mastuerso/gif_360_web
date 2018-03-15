<?php
$userName=get_current_user();
$file="/home/" . $userName . "/gif_360/main/trigger.flag";
$fp = fopen($file, 'w') or die("Where is the file?");
fwrite($fp, '1');
header("location: http://localhost/gif_360_web/gui/");
?>