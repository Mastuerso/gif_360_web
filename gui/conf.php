<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">

		<title>MOVIL EVOLUTION</title>
		<link rel="stylesheet" href="dist/css/login/login.css">
		<link rel="stylesheet" href="dist/css/login/creative.min.css">
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
		<!-- Ionicons -->
		<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
		<link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
		<link rel="stylesheet" href="dist/css/AdminLTE.min.css">
		<link rel="stylesheet" href="dist/css/error.css">

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

	</head>

	<?php
    $userName=get_current_user();
    $file="/home/" . $userName . "/gif_360/main/gif_settings.txt";
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
            case 12:
                //facebook post
                $newline=ltrim($newline, "calibrated=");
                $calibrated=$newline;
                break;
        }
        $count++;
	}

?>

	<body id="page-top" class="fondo">
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		<div class="page conten">
			<header class="her1">

				<ul class="sidebar-menu">
					<li class="treeview">
						<label id="btn_1" class="m" onclick="home()">Home</label>
					</li>
					<li class="treeview">
						<label id="btn_1" class="m" onclick="calibrar()">Calibrar</label>
					</li>
					<li class="treeview">
						<label id="btn_1" class="m" onclick="configuracio()">Configuración</label>
					</li>



					<!--aqui Termina el Menu-->
				</ul>
				</header>

		</div>
	</div>

	<form action="gui_data2.php" method="post" >
		<div class="container " >
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="logos2" hidden>
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>

				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">

					<img class="logo"  src="images/logo-movil.png"/>



				</div>
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">


					<img class="logo"  src="images/Social_By_blackEcco.png"/>


				</div>
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>


			</div>

			<div>
				<input type="text" id="shut">
				<input type="text" id="isoo">
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="fotos">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>

				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="caja">


				<select id="Shutter">
					<option value="-1">Shutter speed</option>
					<option value="0">Choice:  bulb</option>
					<option value="1">Choice:  30</option>
					<option value="2">Choice:  25</option>
					<option value="3">Choice:  20</option>
					<option value="4">Choice:  15</option>
					<option value="5">Choice:  13</option>
					<option value="6">Choice:  10</option>
					<option value="7">Choice:  8</option>
					<option value="8">Choice:  6</option>
					<option value="9">Choice:  5</option>
					<option value="10">Choice:  4</option>
					<option value="11">Choice: 3.2</option>
					<option value="12">Choice: 2.5</option>
					<option value="13">Choice: 2</option>
					<option value="14">Choice: 1.6</option>
					<option value="15">Choice: 1.3</option>
					<option value="16">Choice: 1</option>
					<option value="17">Choice: 0.8</option>
					<option value="18">Choice: 0.6</option>
					<option value="19">Choice: 0.5</option>
					<option value="20">Choice: 0.4</option>
					<option value="21">Choice: 0.3</option>
					<option value="22">Choice: 1/4</option>
					<option value="23">Choice: 1/5</option>
					<option value="24">Choice: 1/6</option>
					<option value="25">Choice: 1/8</option>
					<option value="26">Choice: 1/10</option>
					<option value="27">Choice: 1/13</option>
					<option value="28">Choice: 1/15</option>
					<option value="29">Choice: 1/20</option>
					<option value="30">Choice: 1/25</option>
					<option value="31">Choice: 1/30</option>
					<option value="32">Choice: 1/40</option>
					<option value="33">Choice: 1/50</option>
					<option value="34">Choice: 1/60</option>
					<option value="35">Choice: 1/80</option>
					<option value="36">Choice: 1/100</option>
					<option value="37">Choice: 1/125</option>
					<option value="38">Choice: 1/160</option>
					<option value="39">Choice: 1/200</option>
					<option value="40">Choice: 1/250</option>
					<option value="41">Choice: 1/320</option>
					<option value="42">Choice: 1/400</option>
					<option value="43">Choice: 1/500</option>
					<option value="44">Choice: 1/640</option>
					<option value="45">Choice: 1/800</option>
					<option value="46">Choice: 1/1000</option>
					<option value="47">Choice: 1/1250</option>
					<option value="48">Choice: 1/1600</option>
					<option value="49">Choice: 1/2000</option>
					<option value="50">Choice: 1/2500</option>
					<option value="51">Choice: 1/3200</option>
					<option value="52">Choice: 1/4000</option>

				</select>

				</div>

				</section>


				<div class="caja">
					<select id="Aperture">
						<option value="-1">Aperture</option>
						<option value="0">Choice: 5.6</option>
						<option value="1">Choice: 6.3</option>
						<option value="2">Choice: 7.1</option>
						<option value="3">Choice: 8</option>
						<option value="4">Choice: 9</option>
						<option value="5">Choice: 10</option>
						<option value="6">Choice: 11</option>
						<option value="7">Choice: 13</option>
						<option value="8">Choice: 14</option>
						<option value="9">Choice: 16</option>
						<option value="10">Choice: 18</option>
						<option value="11">Choice: 20</option>
						<option value="12">Choice: 22</option>
						<option value="13">Choice: 25</option>
						<option value="14">Choice: 29</option>
						<option value="15">Choice: 32</option>
						<option value="16">Choice: 36</option>
					</select>

				</div>






				</div>
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="caja">
					<select id="Format">
						<option value="-1">Image Format</option>
						<option value="0">Choice: Large Fine JPEG</option>
						<option value="1">Choice: Large Normal JPEG</option>
						<option value="2">Choice: Medium Fine JPEG</option>
						<option value="3">Choice: Medium Normal JPEG</option>
						<option value="4">Choice: Small Fine JPEG</option>
						<option value="5">Choice: Small Normal JPEG</option>
						<option value="6">Choice: Smaller JPEG</option>
						<option value="7">Choice: Tiny JPEG</option>
						<option value="8">Choice: RAW + Large Fine JPEG</option>
						<option value="9">Choice: RAW</option>
					</select>
				</div>
				<div class="caja">


				<select id="iso">
					<option value="-1">ISO</option>

					<option value="0">Choice: Auto</option>
					<option value="1">Choice: 100</option>
					<option value="2">Choice: 200</option>
					<option value="3">Choice: 400</option>
					<option value="4">Choice: 800</option>
					<option value="4">Choice: 1600</option>
					<option value="6">Choice: 3200</option>
					<option value="7">Choice: 6400</option>



				</select>
				</div>

				</div>
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>


			</div>
			<input type="submit" id="enviar" >

			<a href="#" id="save" style="color:white !important;">Guardar</a>

			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="calibrac" >
			<div class="col-xs-1 col-sm-3 col-md-3 col-lg-3"></div>
			<div class="col-xs-8 col-sm-6 col-md-6 col-lg-6">


					<center>
					<section>


						<a onclick="aplicar2()" class="myButton">Aplicar</a>
						<a onclick="regresar2()" class="myButton2">Regresar</a>

					</section>

					</center>


			</div>
		</div>

		</div>
	</form>





<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
 <script src="https://apis.google.com/js/api:client.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="dist/js/CosumoServicios/login.js"></script>
<!--
<script src="dist/js/CosumoServicios/login.js"></script>
<script src="dist/js/CosumoServicios/creative.min.js"></script>
-->

</body>

</html>
