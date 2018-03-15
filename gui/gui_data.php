<?php
include_once '/var/www/html/gif_360_web/gui/txtParser.php';
#Where is the file msg can be fixed by changing permisions on the txt file
$userName=get_current_user();
$file="/home/" . $userName . "/gif_360/main/gif_settings.txt";
$values=parse_txt($file);

$values["delay"] = $_POST["aux_fps"];
$values["loop"] = $_POST["loop"];
$values["in_between"] = $_POST["in_between"];
$values["quality"] = $_POST["aux_quality"];
$values["freeze"] = $_POST["free_aux"];
$values["cam_delay"] = $_POST["aux_delay"];
$values["email"] = $_POST["email2"];
$values["mailto"] = $_POST["correo"];
$values["watermark"] = $_POST["marka"];
$values["wmark"] = $_POST["wmark"];
$values["fb_post"] = $_POST["fb_aux"];
$values["fb_message"] = $_POST["fb_message"];
$values["calibrated"] = $_POST["calib"];
$values["gif360"] = $_POST["giff"];


write_txt($values, $file);

header("location: http://localhost/gif_360_web/gui/");
?>
