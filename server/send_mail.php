#!/usr/bin/php

<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load composer's autoloader

require '/var/www/html/vendor/autoload.php';

$mail = new PHPMailer(true);// Passing `true` enables exceptions
$username='soporte.gif360@gmail.com';
$pswd=base64_decode('WjJsbU16WXc=');
$recipient='antonio.credoz@gmail.com';
$m_attch='/home/onikom/Pictures/nov29_1856_33.mp4';
$v_url='http://socialevent.mx/gif/uploads/360/nov29_1856_33.mp4';
$img_url='http://socialevent.mx/gif/uploads/360/nov29_1856_33.gif';

$email_msg = <<< SHACA
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title>Black Ecco Group | Comunitarian Private Equety</title>
</head>
<body style="font-family:Verdana;">
<center>
<!--Comienza heading-->
<table cellspacing="0" cellpadding="0" width="600" bgcolor="#ffffff">
<tbody>
<tr>
<td align="center" valign="top" style="color:#b5b5b5;padding:3px;font-family:Verdana;">
<br>Si no puedes ver este anuncio importante, <a href="NL-BE-28112017.html" style="color:#007ad1;">sigue este enlace.</a>
<br>
<br>
</td>
</tr>
<tr>
<td style="background-color:#fff;padding:4px;" align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logobe.png" width="180" alt="BlackEcco_Group">
</td>
</tr>
</tbody>
</table>
<!--Content-->
<table cellspacing="0" cellpadding="0" width="600">
<tbody>
<tr>
<td>
<img src="http://socialevent.mx/gif/uploads/360/images/banner.png">
</td>
</tr>
<tr>
<td>
<video width="600" height="400" autoplay loop>
<source src="$v_url" type="video/mp4">
<a href="$v_url">
<img border="0" src="$img_url" width="600" height="400">
</a>
</video>
</td>
</tr>
</tbody>
</table>
<!--Button-->
<table cellspacing="0" cellpadding="0" width="600" bgcolor="#000">
<tbody>
<tr style="height: 30px">
<td></td><td></td><td></td>
</tr>
<tr>
<td></td><td style="background-color: #008cff; border-radius: 10px; width: 300px; height: 60px; color: #fff; font-family: Verdana; text-align: center;font-size: 30px;"><a href="{$v_url}" target="_blank" style="text-decoration: none; color: #fff;">DESCARGAR</a></td><td></td>
</tr>
<tr style="height: 30px">
<td></td><td></td><td></td>
</tr>
</tbody>
</table>
<hr style="color: #ccc; width: 50%;">
<table cellspacing="0" cellpadding="0" width="600">
<tbody>
<tr>
<td align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logocp.png"></td><td align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logomv.png"></td><td align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logort.png"></td><td align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logoot.png"></td><td align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logose.png"></td>
</tr>
<tr>
<td align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logola.png"></td><td align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logolc.png"></td><td align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logohc.png"></td><td align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logolco.png"></td><td align="center"><img src="http://socialevent.mx/gif/uploads/360/images/logolsl.png"></td>
</tr>
</tbody>
</table>
<table cellspacing="0" cellpadding="0" width="600">
<td style="font-size:12px;color:#fff;font-family:Verdana ;text-align:center;padding:6px; padding-top: 50px">
<a href="https://twitter.com/BlackEcco_Group?lang=es" target="_blank" style="text-decoration:none;"><img src="http://socialevent.mx/gif/uploads/360/images/txt.png"/></a>
<a href="https://www.instagram.com/blackecco_group/?hl=es-la" target="_blank" style="text-decoration:none;"><img src="http://socialevent.mx/gif/uploads/360/images/sg.png"/></a>
<a href="https://www.facebook.com/BlackEcco/" target="_blank" style="text-decoration:none;"><img src="http://socialevent.mx/gif/uploads/360/images/fb.png"/></a>
<a href="https://www.linkedin.com/company/10242065/admin/updates/" target="_blank" style="text-decoration:none;"><img src="http://socialevent.mx/gif/uploads/360/images/li.png"/></a>
</td>
</tr>
<tr>
<td align="center">
<h1><a href="" style="font-family:Verdana; text-decoration:none; color: #008cff;">www.blackeccogroup.com</a></h1>
</td>
</tr>
</table>
<!--Footer terminos y condiciones-->
<table cellspacing="0" cellpadding="4" width="600" bgcolor="#ffffff">
<tbody>
<tr>
<td width="496" style="background-color:#fff;font-size:9px;color:#666;font-family:Verdana;text-align:justify;">
<br>
<p align="justify">AVISO DE PRIVACIDAD: Black Ecco SAPI de CV con domicilio en Cerrada Corina 18, Coyoacán, C.P. 04100, es responsable del uso, protección y confidencialidad de los datos personales que nos proporciona. La información personal que nos proporciona será utilizada para los siguientes fines: Proveerle servicios y productos que ha solicitado, conocer su perfil de candidato a puestos de trabajo, contactarlo, corroborar datos que proporcione en el cv. Para mayor información puede encontrar nuestro Aviso de Privacidad en nuestra página web.</p>
<br>
<br>
<center>
<a href="http://movil-evolution.com.mx/"><img src="http://socialevent.mx/gif/uploads/360/images/" height="60" alt="http://socialevent.mx/gif/uploads/360/images/logobe.png"></a>
</center>
<br>
<center style="color:#6a6a6a;">Black Ecco Gruop, Derechos reservados 2017</center>
<br>
</td>
</tr>
</tbody>
</table>
</center>
</body>
</html>
SHACA;

try {
    //Server settings
    $mail->SMTPDebug = 2;                                   // Enable verbose debug output
    $mail->isSMTP();                                        // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = $username;                 // SMTP username
    $mail->Password = $pswd;                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($username, 'Gif360');
    //$mail->addAddress('antonio.credoz@gmail.com', 'Anthony');     // Add a recipient
    $mail->addAddress($recipient);               // Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment($m_attch);    // Optional name
    //$mail->addAttachment($m_attch, 'gif360');    // Optional name

    //Content
    $mail->CharSet = 'UTF-8';
    //$mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Gif360';

    $mail->Body = $email_msg;


    $mail->isHTML(true);
    //$mail->AltBody = '!Este correo contiene un Gif360!';

    $mail->send();
    echo 'Message has been sent' . "\r\n";
} catch (Exception $e) {
    echo 'Message could not be sent.' . "\r\n";
    echo 'Mailer Error: ' . $mail->ErrorInfo . "\r\n";
}
