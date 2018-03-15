<?php
    #Where is the file msg can be fixed by changing permisions on the txt file
    $userName=get_current_user();
    $gif_attr=fopen("/home/" . $userName . "/gif_360/main/camera.config", "w") or die("Where is the file?");

    $txt="==========SETTINGS=========="."\n";
    fwrite($gif_attr, $txt);

    $txt="| Sessions settings are    |"."\n";
    fwrite($gif_attr, $txt);

    $txt="| applied to every camera  |"."\n";
    fwrite($gif_attr, $txt);

    $txt="==========SESSION==========="."\n";
    fwrite($gif_attr, $txt);

    $txt="Shutter speed = ".$_POST["Shutter"]."\n";
    fwrite($gif_attr, $txt);

    $txt="Aperture = ".$_POST["Aperture"]."\n";
    fwrite($gif_attr, $txt);

    $txt="ISO = ".$_POST["iso"]."\n";
    fwrite($gif_attr, $txt);

    $txt="Image format = ".$_POST["Format"]."\n";
    fwrite($gif_attr, $txt);


    $txt="========CALIBRATION========="."\n";
    fwrite($gif_attr, $txt);

    $txt="Shutter speed = ".$_POST["Shutter"]."\n";
    fwrite($gif_attr, $txt);

    $txt="Aperture = ".$_POST["Aperture"]."\n";
    fwrite($gif_attr, $txt);

    $txt="ISO = ".$_POST["iso"]."\n";
    fwrite($gif_attr, $txt);

    $txt="Image format = ".$_POST["Format"]."\n";
    fwrite($gif_attr, $txt);

    $txt="===========GUIDE==========="."\n";
    fwrite($gif_attr, $txt);

    $txt="| Read *.list files to    |"."\n";
    fwrite($gif_attr, $txt);

    $txt="| see available options   |"."\n";
    fwrite($gif_attr, $txt);

    $txt="==========================="."\n";
    fwrite($gif_attr, $txt);

    fclose($gif_attr);

    header("location: http://localhost/gif_360_web/gui/");

?>
