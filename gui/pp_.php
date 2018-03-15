<?php
    $userName=get_current_user();
    #Where is the file msg can be fixed by changing permisions on the txt file
    $gif_attr=fopen("/home/" . $userName . "/gif_360/main/gif_settings.txt", "w") or die("Where is the file?");
?>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script>
        alert("sadasd23a2d12a3sd21a23sd21as2d121asd3as23d1as2da23s");
            $(document).ready(function(){
                $('.slide').click(function(){
                    alert("hi");
                    $(".target").show();
                });
                $('.hide-target').click(function(){
                    $(".target").hide();
                });
                $('.slide').trigger("click");
            });
    </script>
<?php
    $txt="delay=".$_POST["aux_fps"]."\n";
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

    $txt="quality=".$_POST["aux_quality"]."\n";
    fwrite($gif_attr, $txt);

    if ($_POST["free_aux"] == "1"){
        $txt="freeze=1\n";
    } else {
        $txt="freeze=0\n";
    }
    fwrite($gif_attr, $txt);

    $txt="d_delay=".$_POST["aux_delay"]."\n";
    fwrite($gif_attr, $txt);

    if ($_POST["email2"] == "1"){
        $txt="email=1\n";
    } else {
        $txt="email=0\n";
    }
    fwrite($gif_attr, $txt);

    $txt="mailto=".$_POST["correo"]."\n";
    fwrite($gif_attr, $txt);

    if ($_POST["marka"] == "1"){
        $txt="watermark=1\n";
    } else {
        $txt="watermark=0\n";
    }
    fwrite($gif_attr, $txt);

    if ($_POST["wmark"] == "") {
        $txt="wmark=".$_POST["oldwmark"]."\n";
    } else {
        $txt="wmark=".$_POST["wmark"]."\n";
    }
    $txt=str_replace("file://", "", $txt);
    fwrite($gif_attr, $txt);

    if ($_POST["fb_aux"] == "1"){
        $txt="fb_post=1\n";
    } else {
        $txt="fb_post=0\n";
    }
    fwrite($gif_attr, $txt);

    if ($_POST["calib"] == "1"){
        $txt="calibrated=1\n.\n";
    } else {
        $txt="calibrated=0\n.\n";
    }
    fwrite($gif_attr, $txt);

    fclose($gif_attr);
    //header("location: http://localhost/gif_360_web/gui/");
    exit();
?>
