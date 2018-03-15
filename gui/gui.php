<?php
include_once '/var/www/html/gif_360_web/gui/txtParser.php';

$userName=get_current_user();
$file="/home/" . $userName . "/gif_360/main/gif_settings.txt";
$values=parse_txt($file);

$delay=$values["delay"];
$gif360=$values["gif360"];
$quality=$values["quality"];
$freeze==$values["freeze"];
?>

<html>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
  <script src="toggle.js"></script>

    <head>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="stylesheet.css" >
        <link href="https://fonts.googleapis.com/css?family=Teko" rel="stylesheet">
    </head>
    <body>
      <div id="wrapperHeader">
        <div id="header">
          <img src="assets/logo-movil.png" alt="logo" />
          <img src="assets/Social_By_blackEcco.png" width="300px" alt="">
        </div>
      </div>
      <br>


        <form action="gui_data.php" method="post">

          <!--
          <img id="pic" src="assets/FREEZE-ON.png" name="freeze" value="true" onclick="test()"/>
        -->


            <!--Quality(%): -->
            Quality?=<?=$quality?>
            <!--
            <input type="text" name="quality" value="<?=$quality?>" placeholder=Quality(%):><br>
          -->
            <input type="range" name="quality" min="1" max="100" value="<?=$quality?>" class="slider" id="myRange"><br>
            <!--Delay: -->
            FPS?=<?=$delay?>
            <!--
            <input type="text" name="delay" value="<?=$delay?>" placeholder="Frames Per Second":><br>
          -->
            <input type="range" name="delay" min="1" max="60" value="<?=$delay?>" class="slider" id="myRange"><br>
            <!--
            Gif360 yes or not?:
            <?php
                #if ($gif360==0){
                #    echo '<input type="checkbox" name="gif360" value="0"><br>';
                #} else
                #    echo '<input type="checkbox" name="gif360" value="1" checked><br>';

            ?>
            -->
            FB Post
            <?php
                if ($fb_post==0){
                    echo '<input type="checkbox" name="facebook" value="1"><label for="thing"></label>';
                } else {
                    echo '<input type="checkbox" name="facebook" value="1" checked><label for="thing"></label>';
                }
            ?>
            Email:
            <?php
                if ($email==0){
                    echo '<input type="checkbox" name="email" value="1"><br>';
                } else {
                    echo '<input type="checkbox" name="email" value="1" checked><br>';
                    echo '<input type="text" name="mailto" value="'.$mailto.'" placeholder="username@example.com":><br>';
                }
            ?>
            Freeze:
            <?php
                if ($freeze==0){
                    echo '<input type="checkbox" name="freeze" value="1">';
                    echo '<input type="text" name="cam_delay" value="'.$cam_delay.'" placeholder="Delay between cameras":><br>';
                } else {
                    echo '<input type="checkbox" name="freeze" value="1" checked>';
                }
                //echo '<input type="text" name="cam_delay" value="'.$cam_delay.'" placeholder="Delay between cameras":><br>';
            ?>
            Watermark
            <?php
                if ($watermark==0){
                    echo '<input type="checkbox" name="watermark" value="1"><br>';
                } else {
                    echo '<input type="checkbox" name="watermark" value="1" checked><br>';
                    echo '<input type="text" name="wmark" value="" placeholder="Drop new image here":><br>';
                }
                //echo 'Image: '.$wmark.'<br>';
                if ($wmark!="") {
                    echo '<input type="hidden" name="oldwmark" value="'.$wmark.'":>';
                }
                //echo '<input type="text" name="wmark" value="" placeholder="Drop new image here":><br>';
                //echo '<input type="checkbox" name="thing" value="valuable" id="thing"/><label for="thing"></label>';
            ?>
            Calibrated
            <?php
                if ($calibrated==0){
                    echo '<input type="checkbox" name="calibrated" value="1"><label for="thing"></label>';
                } else {
                    echo '<input type="checkbox" name="calibrated" value="1" checked><label for="thing"></label>';
                }
            ?>
            <input type="submit" value="Ok">
        </form>
    </body>
</html>
