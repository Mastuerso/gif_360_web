<?php
    #Where is the file msg can be fixed by changing permisions on the txt file
    $gif_attr=fopen("/home/onikom/gif_360/main/gif_settings.txt", "w") or die("Where is the file?");
    $txt="delay=".$_POST["delay"]."\n";
    fwrite($gif_attr, $txt);
    if ($_POST["loop"] == "true"){
        $txt="loop=0\n";
    } else {
        $txt="loop=1\n";
    }
    fwrite($gif_attr, $txt);
    if ($_POST["patrol_cycle"] == true){
        $txt="patrol_cycle_gif=1\n";
    } else {
        $txt="patrol_cycle_gif=0\n";
    }
    fwrite($gif_attr, $txt);
    if ($_POST["in_between"] == true){
        $txt="in_between=1\n";
    } else {
        $txt="in_between=0\n";
    }
    fwrite($gif_attr, $txt);

    $txt="quality=".$_POST["quality"]."\n";
    fwrite($gif_attr, $txt);

    if ($_POST["freeze"] == true){
        $txt="freeze=1\n";
    } else {
        $txt="freeze=0\n";
    }
    fwrite($gif_attr, $txt);

    $txt="d_delay=".$_POST["cam_delay"]."\n";
    fwrite($gif_attr, $txt);

    if ($_POST["email"] == true){
        $txt="email=1\n";
    } else {
        $txt="email=0\n";
    }
    fwrite($gif_attr, $txt);

    $txt="mailto=".$_POST["mailto"]."\n.\n";
    fwrite($gif_attr, $txt);
  
    fclose($gif_attr);
    header("location: http://localhost/gif_360_web/gui/gui.php");
    exit();
?>
