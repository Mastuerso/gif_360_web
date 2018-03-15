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
		<!-- Ionicons -->
	<!--link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
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

<body id="page-top" class="fondo">

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
		</div>

		<div class="container ">

			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="logos">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>


				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">


					<font color="white " class="mb-0">Loading ...
						<?php
						include_once '/var/www/html/gif_360_web/gui/txtParser.php';
						$userName=get_current_user();
						$file="/home/" . $userName . "/gif_360/main/gif_settings.txt";
						$values=parse_txt($file);
						$calibration_flag = $values["calibrated"];
						$printFlag=false;
						/*
						if ($calibration_flag == 1){
							echo "<br>Cameras are calibrated";
						} else {
							echo "<br>Cameras are NOT calibrated";
						}
						*/
						while ($calibration_flag == 0){
							sleep(5);
							$values=parse_txt($file);
							$calibration_flag = $values["calibrated"];
							#if(!$printFlag){
							#	$printFlag = true;
							#	#echo "<br>Cameras are NOT calibrated";
							#}

						}
						#echo "<br>Cameras are calibrated";

						header("location: http://localhost/gif_360_web/gui/");
					?>

					</font>
					<font id="cargando" color="white " class="mb-0">
					</font>


				</div>
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>


			</div>
		</div>


	</form>

</body>

</html>