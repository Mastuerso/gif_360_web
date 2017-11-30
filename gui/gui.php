<?php
    $file="/home/onikom/gif_360/main/gif_settings.txt";

    $document=file_get_contents($file);

    $lines=explode("\n",  $document);
    //$gif_attr=array();
    $delay;
    $loop;
    $patrol_cycle;
    $in_between;
    $quality;
    $freeze;
    $count=0;
    foreach($lines as $newline) {
        //$newline=ltrim($newline, "delayloopplatrolcycle_gifinbetweenqualityfreezed_delayemailmailto=");
        switch($count) {
            case 0:
                $newline=ltrim($newline, "delay=");
                //$gif_atrr['delay']=$newline;
                $delay=$newline;
                //echo "Delay: ".$delay.'<br>';
                break;
            case 1:
                $newline=ltrim($newline, "loop=");
                //$gif_atrr['loop']=$newline;
                $loop=$newline;
                //echo "Loop: ".$loop.'<br>';
                break;
            case 2:
                $newline=ltrim($newline, "platrolcycle_gif=");
                //$gif_atrr['patrol_cycle']=$newline;
                $patrol_cycle=$newline;
                //echo "Patrol cycle: ".$patrol_cycle.'<br>';
                break;
            case 3:
                $newline=ltrim($newline, "in_between=");
                //$gif_atrr['in_between']=$newline;
                $in_between=$newline;
                //echo "In between: ".$in_between.'<br>';
                break;
            case 4:
                $newline=ltrim($newline, "quality=");
                //$gif_atrr['quality']=$newline;
                $quality=$newline;
                //echo "Quality: ".$quality.'<br>';
                break;
            case 5:
                $newline=ltrim($newline, "freeze=");
                $freeze=$newline;
                break;
            case 6:
                $newline=ltrim($newline, "d_delay=");
                $cam_delay=$newline;
                //echo "Cam Delay: ".$cam_delay.'<br>';
                break;
            case 7:
                $newline=ltrim($newline, "email=");
                $email=$newline;
                //echo "Mail?".$email.'<br>';
                break;
            case 8:
                $newline=substr($newline, 7);
                $mailto=$newline;
                //echo "Mailto: ".$mailto.'<br>';
                break;
            case 9:
                //watermark
                $newline=ltrim($newline, "watermark=");
                $watermark=$newline;
                break;
            case 10:
                //watermark
                $newline=substr($newline, 6);
                $wmark=$newline;
                break;
            case 11:
                //facebook post
                $newline=ltrim($newline, "fb_post=");
                $fb_post=$newline;
                break;
        }
        $count++;
    }
?>

<html>
    <head>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="stylesheet.css" >
        <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet">
    </head>
    <body>
        <form action="gui_data.php" method="post">
            Freeze:
            <?php
                if ($freeze==0){
                    echo '<input type="checkbox" name="freeze" value="true"><br>';
                    echo '<input type="text" name="cam_delay" value="'.$cam_delay.'" placeholder="Delay between cameras":><br>';
                } else {
                    echo '<input type="checkbox" name="freeze" value="true" checked><br>';
                }
                //echo '<input type="text" name="cam_delay" value="'.$cam_delay.'" placeholder="Delay between cameras":><br>';
            ?>
            <!--Delay: -->
            <input type="text" name="delay" value="<?=$delay?>" placeholder="FPS":><br>
            <!--Quality(%): -->
            <input type="text" name="quality" value="<?=$quality?>" placeholder=Quality(%):><br>
            <!--
            Loop the gif:
            <?php
                #if ($loop==0){
                #    echo '<input type="checkbox" name="loop" value="true" checked><br>';
                #} else
                #    echo '<input type="checkbox" name="loop" value="true"><br>';

            ?>
            Create in betweens:
            <?php
                #if ($in_between==0){
                #    echo '<input type="checkbox" name="in_between" value="true"><br>';
                #} else
                #    echo '<input type="checkbox" name="in_between" value="true" checked><br>';

            ?>
            Patrol cycle gif:
            <?php
                #if ($patrol_cycle==0){
                #    echo '<input type="checkbox" name="patrol_cycle" value="true"><br>';
                #} else
                #    echo '<input type="checkbox" name="patrol_cycle" value="true" checked><br>';

            ?>
            -->
            Email:
            <?php
                if ($email==0){
                    echo '<input type="checkbox" name="email" value="true"><br>';
                } else {
                    echo '<input type="checkbox" name="email" value="true" checked><br>';
                }
                echo '<input type="text" name="mailto" value="'.$mailto.'" placeholder="username@example.com":><br>';
            ?>
            Watermark
            <?php
                if ($watermark==0){
                    echo '<input type="checkbox" name="watermark" value="true"><br>';
                } else {
                    echo '<input type="checkbox" name="watermark" value="true" checked><br>';
                    echo '<input type="text" name="wmark" value="" placeholder="Drop new image here":><br>';
                }
                //echo 'Image: '.$wmark.'<br>';
                if ($wmark!="") {
                    echo '<input type="hidden" name="oldwmark" value="'.$wmark.'":>';
                }
                //echo '<input type="text" name="wmark" value="" placeholder="Drop new image here":><br>';
            ?>
            FB Post
            <?php
                if ($fb_post==0){
                    echo '<input type="checkbox" name="facebook" value="true"><br>';
                } else {
                    echo '<input type="checkbox" name="facebook" value="true" checked><br>';
                }
            ?>
            <input type="submit" value="Ok">
        </form>
    </body>
</html>
