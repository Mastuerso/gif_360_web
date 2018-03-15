<?php

include_once '/var/www/html/gif_360_web/gui/txtParser.php';
include_once '/var/www/html/gif_360_web/gui/dotListParser.php';

$userName = get_current_user();

#$userName=get_current_user();
#echo 'Current script owner: ' . $userName . "\r\n";
#$array = array("foo", "bar", "hello", "world");
##var_dump($array);
#foreach($array as $member){
#    echo $member . "\r\n";
#}

#recieving arguments
#$raw_args=$argv;
##recipient for the keys and values
#$argrray=array();
#if( count($raw_args) > 0 )
#    foreach ( $raw_args as $arg ){
#        if( strstr($arg, '=') ) {
#
#            list($x, $y) = explode('=', $arg);
#            if ( strstr($y, ',') ){
#
#                $y_array=explode(',', $y);
#                $argrray["$x"] = $y_array;
#                #print_r($y_array);
#
#            } else {
#
#                $argrray["$x"] = $y;
#
#            }
#
#        }
#
#    }
#if( count($argrray) > 0 )
#    print_r($argrray);

#$minidir="/home/onikom/gif_360/main/gifs/feb25_236_41";
#$files=array_diff(scandir($minidir), array('..', '.'));
##print_r($files);
#foreach ($files as $filename) {
#    #echo "$filename" . "\n";
#    if ( strstr($filename, '.mp4') ) $video=$filename;
#    if ( strstr($filename, '.gif') ) $gif=$filename;
#}
#
#echo "vid: $video\n" .
#    "gif: $gif\n";
#
#
#if (count($argv) > 1 )
#    echo $argv[1] . "\n";

$listFile = "/home/" . $userName . "/gif_360/main/imageformat.list";
$listValues = parseDotList($listFile);
#print_r($listValues);
$cameraConfig="/home/" . $userName . "/gif_360/main/camera.config";
$camValues=parse_txt($cameraConfig, true);
print_r($camValues);

#$file="/home/" . $userName . "/gif_360/main/gif_settings.txt";
#$file="/home/" . $userName . "/gif_360/main/camera.config";
#$dummyFile="/home/" . $userName . "/gif_360/main/dummy_settings.txt";
#$values=parse_txt($file);
#print_r($values);
#write_txt($values, $dummyFile);

/*
function defaultTest($message, $flag = false) {
if($flag){
echo "flag is defined: {$message} \n";
} else {
echo "flag is not defined: {$message} \n";
}
}

defaultTest("Hello");
defaultTest("Bye", true);
 */

/*
$txt="";
foreach ($values as $key => $value) {
// $arr[3] will be updated with each value from $arr...
if(is_array($value)) {
$members=count($value);
#echo "{$key} => ";
$txt.="{$key} = ";
for($i=0; $i < $members; $i++){
if( $i == 0){
#echo "{$value[$i]}";
$txt.="{$value[$i]}";
} else {
#echo "; {$value[$i]}";
$txt.="; {$value[$i]}";
}
}
#echo "\n";
$txt.="\n";
} else {
#echo "{$key} => {$value}\n";
$txt.="{$key} = {$value}\n";
}
}
$fileTxt=fopen($file, "w") or die("Where is the file?");
fwrite($fileTxt, $txt);
 */

#print_r($values);

#$gif_attr=fopen($file, "w") or die("Where is the file?");
#if ($_POST["patrol_cycle"] == true){
#    $txt="patrol_cycle_gif=1\n";
#} else {
#    $txt="patrol_cycle_gif=0\n";
#}
#fwrite($gif_attr, $txt);

#if( count($values) > 0 )
#    print_r($values);
#
#$arrayTest=array();
#    if ( count($values["mailto"]) > 1 ) {
#        #print_r($values["mailto"]);
#        $arrayTest=$values["mailto"];
#    } else {
#        #echo $values["mailto"] . "\n";
#        $arrayTest[0]=$values["mailto"];
#    }
