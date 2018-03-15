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
	<!--link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">

	link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"-->
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
include_once '/var/www/html/gif_360_web/gui/txtParser.php';
include_once '/var/www/html/gif_360_web/gui/dotListParser.php';
$userName=get_current_user();
$file="/home/" . $userName . "/gif_360/main/gif_settings.txt";
$cameraConfig="/home/" . $userName . "/gif_360/main/camera.config";
$values=parse_txt($file, true);
$camValues=parse_txt($cameraConfig, true);

$listShutter = "/home/" . $userName . "/gif_360/main/shutterspeed.list";
$valuesShutter = parseDotList($listShutter);

$listAperture = "/home/" . $userName . "/gif_360/main/aperture.list";
$valuesAperture = parseDotList($listAperture);

$listISO = "/home/" . $userName . "/gif_360/main/iso.list";
$valuesISO = parseDotList($listISO);

$listFormat = "/home/" . $userName . "/gif_360/main/imageformat.list";
$valuesFormat = parseDotList($listFormat);

/*//un-comment for fast debugging
foreach ($values as $key => $value) {
	echo "<div>";
    if(is_array($value)) {
        $members=count($value);
        echo "{$key} => ";
        for($i=0; $i < $members; $i++){
            if( $i == 0){
                echo "{$value[$i]}";
            } else {
                echo "; {$value[$i]}";
            }
        }
        echo "\n";
    } else {
        echo "{$key} => {$value}\n";
	}
	echo "</div>";
}
*/

$delay = $values["delay"];
$loop = $values["loop"];
$gif360 = $values["gif360"];
$in_between = $values["in_between"];
$quality = $values["quality"];
$freeze = $values["freeze"];
$cam_delay = $values["cam_delay"];
$email = $values["email"];
$mailto = $values["mailto"];
$watermark = $values["watermark"];
$wmark = $values["wmark"];
$mark_position = $values["mark_position"];
$fb_post = $values["fb_post"];
$fb_message = $values["fb_message"];
$calibrated = $values["calibrated"];
if ($fb_message == "") $fb_message = "#MiGif360";
$Shutterspeed = $camValues["Shutterspeed"];
$Aperture = $camValues["Aperture"];
$ISO = $camValues["ISO"];
$Imageformat = $camValues["Imageformat"];

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

		<div id="conf" hidden>
			<form action="gui_data2.php" method="post">
				<div class="container ">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="logos2" hidden>
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>

						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">

							<img class="logo" src="images/logo-movil.png" />



						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">


							<img class="logo" src="images/Social_By_blackEcco.png" />


						</div>
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>


					</div>


					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="fotos">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>

						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">

							Shutter speed:
							<div class="caja">
								<select id="Shutter" name="Shutter">
									<option value="-1">Shutter speed</option>
									<?php
									foreach ($valuesShutter as $key => $value) {
										if ($valuesShutter[$key] == $Shutterspeed) {
											echo "<option selected=\"selected\" value=\"{$value}\">{$value}</option>";
										} else {
											echo "<option value=\"{$value}\">{$value}</option>";
										}
									}
									?>
								</select>
							</div>

							Aperture:
							<div class="caja">
								<select id="Aperture" name="Aperture">
									<option value="-1">Aperture</option>
									<?php
									foreach ($valuesAperture as $key => $value) {
										if ($valuesAperture[$key] == $Aperture) {
											echo "<option selected=\"selected\" value=\"{$value}\">{$value}</option>";
										} else {
											echo "<option value=\"{$value}\">{$value}</option>";
										}
									}
									?>
								</select>
							</div>

						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							Image Quality:

							<div class="caja">
								<select id="Format" name="Format">
									<option value="-1">Image Quality</option>
									<?php
									foreach ($valuesFormat as $key => $value) {
										if ($valuesFormat[$key] == $Imageformat) {
											echo "<option selected=\"selected\" value=\"{$value}\">{$value}</option>";
										} else {
											echo "<option value=\"{$value}\">{$value}</option>";
										}
									}
									?>
								</select>
							</div>

							ISO:

							<div class="caja">
								<select id="iso" name="iso">
									<option value="-1">ISO</option>
									<?php
									foreach ($valuesISO as $key => $value) {
										if ($valuesISO[$key] == $ISO) {
											echo "<option selected=\"selected\" value=\"{$value}\">{$value}</option>";
										} else {
											echo "<option value=\"{$value}\">{$value}</option>";
										}
									}
									?>
								</select>
							</div>

						</div>
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>


					</div>
					<div hidden>
						<input type="submit" id="enviar2" name="enviar2">
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="calibrac">
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

		</div>

		<form action="gui_data.php" method="post" id="frm">

			<div class="container ">

				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="logos">
					<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>

					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">

						<img class="logo" src="images/logo-movil.png" />



					</div>
					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">


						<img class="logo" src="images/Social_By_blackEcco.png" />


					</div>
					<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>


				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="freez">
					<div class="col-xs-1 col-sm-3 col-md-3 col-lg-3"></div>
					<div class="col-xs-8 col-sm-6 col-md-6 col-lg-6">
						<br>
						<img class="logo" id="freeze_png" onclick="freeze()" src="images/FREEZE-OFF.png" />
					</div>
					<div class="col-xs-2 col-sm-3 col-md-3 col-lg-3"></div>
					<div class="col-xs-1 col-sm-0 col-md-0 col-lg-0"></div>


				</div>
				<div id="ocultos" hidden>
					<input type="text" id="aux_delay" name="aux_delay" value="<?=$cam_delay?>">
					<input type="text" id="aux_fps" name="aux_fps" value="<?=$delay?>">

					<input type="text" id="aux_quality" name="aux_quality" value="<?=$quality?>">
					<input type="checkbox" id="email" name="email" value="true">
					<input type="text" id="email2" name="email2">
					<input type="checkbox" name="facebook" id="facebook" value="fb">

					<input type="text" id="fb_aux" name="fb_aux" value="<?=$fb_post?>">
					<input type="text" id="free_aux" name="free_aux" value="<?=$freeze?>">
					<input type="submit" id="enviar" name="enviar" value="enviar">


					<input type="text" id="marka" name="marka" value="<?=$watermark?>">
					<input type="text" name="oldwmark" value="<?=$wmark?>">

					<input type="text" id="calib" name="calib" value="<?=$calibrated?>">

					<input type="text" id="giff" name="giff" value="<?=$gif360?>">



				</div>

				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="conf1">
					<div class="col-xs-1 col-sm-3 col-md-3 col-lg-3"></div>
					<div class="col-xs-8 col-sm-6 col-md-6 col-lg-6">
						<br>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<center>
								<img id="delay_png" class="selectores" onclick="delay()" src="images/DELAY-OFF.png" />
								<font id="texto_delay" color="white" class="mb-0">
									<?=$cam_delay?>
								</font>
							</center>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<center>
								<img id="fps_png" class="selectores" onclick="fps()" src="images/FPS-OFF.png" />
								<font color="white" class="mb-0">1s/</font>
								<font id="texto_fps" color="white" class="mb-0">
									<?=$delay?>
								</font>
							</center>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<center>
								<img id="QUALITYON_png" class="selectores" onclick="QUALITYON()" src="images/QUALITYOFF.png" />
								<font id="texto_quality" color="white " class="mb-0">
									<?=$quality?>
								</font>
								<font color="white " class="mb-0">%QUALiTY</font>
							</center>
						</div>

					</div>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="rangos_1">
					<div class="col-xs-1 col-sm-3 col-md-3 col-lg-3"></div>
					<div class="col-xs-8 col-sm-6 col-md-6 col-lg-6">
						<br>
						<input type="range" id="barra" name="barra" min="0" max="100" step="1" value="0">
					</div>
					<div class="col-xs-2 col-sm-3 col-md-3 col-lg-3"></div>
					<div class="col-xs-1 col-sm-0 col-md-0 col-lg-0"></div>

				</div>



				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="correo_1">
					<div class="col-xs-1 col-sm-3 col-md-3 col-lg-3"></div>
					<div class="col-xs-8 col-sm-6 col-md-6 col-lg-6">
						<br>
						<input class="boton_redondo form-control" style="color:white !important;" type="text" id="correo" name="correo" placeholder="ejemplo@gmail.com"
						    value="<?=$mailto?>">

					</div>
					<div class="col-xs-2 col-sm-3 col-md-3 col-lg-3"></div>
					<div class="col-xs-1 col-sm-0 col-md-0 col-lg-0"></div>
				</div>




				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="video_1">
					<div class="col-xs-1 col-sm-3 col-md-3 col-lg-3"></div>
					<div class="col-xs-8 col-sm-6 col-md-6 col-lg-6">
						<br>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<center>

								<video id="Video2" src="images/ene26_1409_17.mp4" autoplay></video>
								<!--loop-->
							</center>

						</div>

						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<center>

								<img class="selectores" id="WATERMARKON" onclick="mrkagua()" src="images/WATERMARKON.png" />
								<br>
								<br>
								<div id="rutas" hidden>
									<input class="boton_redondo form-control" style="color:white !important; " type="text" id="wmark" name="wmark" placeholder="ruta/imágen.png"
									    value="<?=($wmark != " " ? $wmark : '')?>">
								</div>

								<font color="white " class="mb-0" id="nombreim"></font>
								<br>
								<br>
								<img class="selectores" id="fb" onclick="FB()" src="images/FB-ON.png" />
								<br>
								<br>
								<div id="fb_msg" hidden>
									<input class="boton_redondo form-control" style="color:white !important; " type="text" id="fb_message" name="fb_message"
									    value="<?=$fb_message?>">
								</div>
								<br>

								<img class="selectores" id="go" onclick="GO()" src="images/GO-ON.png" />


							</center>
						</div>

					</div>
				</div>

				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="calibracion_camaras" hidden>
					<div class="col-xs-1 col-sm-3 col-md-3 col-lg-3"></div>
					<div class="col-xs-8 col-sm-6 col-md-6 col-lg-6">


						<center>
							<section>

								<h3 style="color:white !important; ">
									Las camaras:
								</h3>
								<h3 style="color:red !important; " id="si_no">
								</h3>


								<div class="checkboxThree">


									<input type="checkbox" value="1" id="checkboxThreeInput" name="" hidden/>


									<label for="checkboxThreeInput"></label>




								</div>

								<a id="gif180" onclick="gif1()" class="myButton">GIF 180</a>
								<a id="gif360" onclick="gif2()" class="myButton">GIF 360</a>
								<br>
								<br>
								<br>
								<a onclick="aplicar()" class="myButton">Aplicar</a>
								<a onclick="regresar()" class="myButton2">Regresar</a>

							</section>

						</center>


					</div>
				</div>

			</div>



		</form>

		<form action="trigger.php">
			<div class="container">
				<div hidden>
					<input type="submit" id="trigger" name="trigger">
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<center>
						<img id="trigger" onclick="trigger()" src="images/camera.png" />
					</center>
				</div>
			</div>
		</form>


		<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
		<!--script src="https://apis.google.com/js/api:client.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script-->
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="dist/js/CosumoServicios/login.js"></script>
		<!--
<script src="dist/js/CosumoServicios/login.js"></script>
<script src="dist/js/CosumoServicios/creative.min.js"></script>
-->

	</body>

</html>